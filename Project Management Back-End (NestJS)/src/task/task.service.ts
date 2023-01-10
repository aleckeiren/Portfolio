import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Task } from 'src/entities/task.entity';
import { DeleteResult, Not, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRes: Repository<Task>,
        private accountService:AccountService,
    ) {}
    async create(task: any): Promise<any> {
        await this.taskRes.save(task)
        return await this.getProjectTasks(task.project_id);
    }
    
    async  readAll(assigned): Promise<Task[]> {
        return await this.taskRes.find({where:{assigned_to:assigned,task_status:Not('Done')}});
    }

    async  readAllTasks(assigned): Promise<Task[]> {
        return await this.taskRes.find({where:{assigned_to:assigned}});
    }

    async getProjectTasks(id): Promise<Task[]>{
        let tasks = await this.taskRes.find({where:{project_id:id}})
        return await tasks
    }

    async getProjectIP(id): Promise<Task[]>{
        return await this.taskRes.find({where:{project_id:id,task_status:'In Progress'}})
    }

    async getProjectNew(id): Promise<Task[]>{
        return await this.taskRes.find({where:{project_id:id,task_status:'New'}})
    }

    async getProjectDone(id): Promise<Task[]>{
        return await this.taskRes.find({where:{project_id:id,task_status:'Done'}})
    }

    async update(task_id,task: any): Promise<UpdateResult> {
        try {
            delete task.task_id
            delete task.assigned_info
            delete task.owner_info
            delete task.project_name
            return await this.taskRes.update(task_id,task);
        } catch (error) {
            console.log("error")   
        }
    }

    async updateToNull(assigned,project): Promise<UpdateResult> {
        return await this.taskRes.update({assigned_to:assigned,project_id:project},{assigned_to:null});
    }


    async delete(task_id): Promise<DeleteResult> {
        await this.taskRes.query("DELETE FROM commenttask WHERE task_id ="+ task_id);
        return await this.taskRes.delete(task_id);
    }

    async deleteAll(project_id): Promise<any> {
        return await this.taskRes.delete({project_id:project_id});
    }
}
