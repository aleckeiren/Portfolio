import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Membership } from 'src/entities/membership.entity';
import { EventService } from 'src/event/event.service';
import { FileService } from 'src/file/file.service';
import { InviteService } from 'src/invite/invite.service';
import { ProjectService } from 'src/project/project.service';
import { TaskService } from 'src/task/task.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class MembershipService {
    constructor(
        @InjectRepository(Membership)
        private memberRes: Repository<Membership>,
        private projectService:ProjectService,
        private accountService:AccountService,
        private eventService:EventService,
        private taskService:TaskService,
        private inviteService:InviteService,
        private fileService:FileService
    ) {}
    async create(membership: any): Promise<any> {
        let account:any[] = await this.accountService.checkEmail(membership.email);
        if(account.length > 0){
            let member = await this.memberRes.find({where:{project_id:membership['project_id'],account_id:account[0].account_id}})
            if(member.length > 0){
                return {result:"Already a member..."}
            }else{
                membership['account_id'] = account[0].account_id
                delete membership.email;
                await this.memberRes.save(membership)
                return this.readProjectInfo(membership['project_id'])
            }
        }else{
            return {result:"Email is not registered..."}
        }
    }

    async createNewProject(membership:any){
        return await this.memberRes.save(membership);
    }
    
    async  readAll(account_id): Promise<any[]> {
        try {
            let memberships = await this.memberRes.query(`SELECT m.*,p.*,a.first_name AS project_owner_first,a.last_name AS project_owner_last,array(select CONCAT('{"task_id":', task_id ,',"task_name":"' , task_name,'", "task_status":"',task_status,'","task_description":"',task_description,'","task_creation":"',task_creation,'","task_target":"',task_target,'","project_id":',project_id,',"assigned_to":',COALESCE(assigned_to, 0),',"parent_task":', COALESCE(parent_task, 0),',"task_owner":',task_owner,',"assigned_info":"',(SELECT CONCAT(first_name,' ',last_name) FROM ACCOUNT a where account_id = t.assigned_to) ,'","owner_info":"',(SELECT CONCAT(first_name,' ',last_name) FROM ACCOUNT a where account_id = t.task_owner),'"}' ) from task t where (t.project_id = m.project_id)) as project_tasks FROM Membership m JOIN Project P ON m.project_id = p.project_id JOIN Account a ON a.account_id = p.project_owner where m.account_id = `+account_id);
            let count = 0;
            for await (const iterator of memberships) {
                let tasks = JSON.parse('['+iterator.project_tasks.join(',')+']');
                tasks = tasks.map(v => ({...v, project_name: iterator.project_name}))
                memberships[count].project_tasks_done = tasks.filter(x=>x.task_status == "Done").length;
                memberships[count].project_tasks_ip = tasks.filter(x=>x.task_status == "In Progress").length;
                memberships[count].project_tasks_new = tasks.filter(x=>x.task_status == "New").length;
                memberships[count].project_tasks_total = tasks.length;
                memberships[count].project_tasks = tasks;
                count++;
            }
            return await memberships;
        } catch (error) {
            console.log("Error")
        }
    }

    async readProjectInfo(project_id):  Promise<any[]>{
        try {
            let memberships = await this.memberRes.query("SELECT m.*, a.first_name, a.last_name, a.email FROM Membership m JOIN Account a ON a.account_id = m.account_id where m.project_id = " + project_id)
            return await memberships
        } catch (error) {
            console.log("error")
        }
    }

    async getMembership(id):Promise<any>{
        return await this.memberRes.find({where: {account_id: id}});
    }

    async update(membership: any, id): Promise<any> {
        delete membership.first_name
        delete membership.last_name
        delete membership.email
        await this.memberRes.update(id,membership)
        let memberships = await this.readProjectInfo(membership.project_id)
        return await memberships;
    }

    async delete(membership_id,membership:any): Promise<any> {
        try {
            delete membership.account_info
            let project_id = membership.project_id;
            let events = await this.eventService.read(project_id);
            for await (const iterator of events) {
                await this.inviteService.deleteInvite(iterator['event_id'],membership.account_id)
            }
            await this.taskService.updateToNull(membership.account_id,membership.project_id)
            await this.memberRes.delete(membership_id)
            let memberships = await this.readProjectInfo(membership.project_id)
            return await memberships;
        } catch (error) {
            console.log("error")
        }
    }

    async deleteAll(project):Promise<any>{
        await this.projectService.delete(project);
        await this.taskService.deleteAll(project);
        await this.memberRes.delete({project_id:project});
        await this.eventService.deleteAll(project);
        await this.fileService.deleteAll(project);
        return;
    }
}
