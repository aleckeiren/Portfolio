import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Project } from 'src/entities/project.entity';
import { MembershipService } from 'src/membership/membership.service';
import { TaskService } from 'src/task/task.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRes: Repository<Project>,
        private taskService:TaskService,
        private accountService:AccountService,
        // private membershipService:MembershipService
    ) {}
    async create(project: any): Promise<Project> {
        return await this.projectRes.save(project);
    }
    
    async  readAll(owner_id): Promise<Project[]> {
        return await this.projectRes.find({where:{project_owner:owner_id}});
    }

    async getProject(id):Promise<any>{
        try {
            let project = await this.projectRes.query(`SELECT p.*,a.first_name AS project_owner_first,a.last_name AS project_owner_last,array(select CONCAT('{"task_id":', task_id ,',"task_name":"' , task_name,'", "task_status":"',task_status,'","task_description":"',task_description,'","task_creation":"',task_creation,'","task_target":"',task_target,'","project_id":',project_id,',"assigned_to":',COALESCE(assigned_to, 0),',"parent_task":', COALESCE(parent_task, 0),',"task_owner":',task_owner,',"assigned_info":"',(SELECT CONCAT(first_name,' ',last_name) FROM ACCOUNT a where account_id = t.assigned_to) ,'","owner_info":"',(SELECT CONCAT(first_name,' ',last_name) FROM ACCOUNT a where account_id = t.task_owner),'"}' ) from task t where (t.project_id = p.project_id)) as project_tasks FROM Project P JOIN Account a ON a.account_id = p.project_owner where p.project_id =`+id);
            project[0].project_tasks = JSON.parse('['+project[0].project_tasks.join(',')+']');
            return await project[0];
        } catch (error) {
            console.log("Error")
        }
    }

    async update(project_id,project: Project): Promise<UpdateResult> {
        return await this.projectRes.update(project_id,project);
    }

    async delete(project_id): Promise<any> {
        return await this.projectRes.delete(project_id);
    }
}
