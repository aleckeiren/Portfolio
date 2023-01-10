import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){
    }
    @Get(':id/read')
    read(@Param('id') id): Promise<Task[]> {
        return this.taskService.readAll(id);
    }
    @Get(':id/readAll')
    readAllTasks(@Param('id') id): Promise<Task[]> {
        return this.taskService.readAllTasks(id);
    }  
    //   return this.projectService.readAll(owner_id);
    // }

    @Get(':id/tasks')
    getProjectTasks(@Param('id') id): Promise<Task[]> {
        return this.taskService.getProjectTasks(id);
    }
    
    @Get(':id/tasksip')
    getProjectIP(@Param('id') id): Promise<Task[]> {
        return this.taskService.getProjectIP(id);
    }  
    @Get(':id/tasksnew')
    getProjectNew(@Param('id') id): Promise<Task[]> {
        return this.taskService.getProjectNew(id);
    }  
    @Get(':id/tasksdone')
    getProjectDone(@Param('id') id): Promise<Task[]> {
        return this.taskService.getProjectDone(id);
    }  
    
    @Post('create')
    async create(@Body() task: any): Promise<any> {
      return this.taskService.create(task);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() task: any): Promise<any> {
        return this.taskService.update(Number(id),task);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.taskService.delete(id);
    }
}
