import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from './project.service';
@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService){
    }
    @Get(':id/read')
    read(@Param('id') id): Promise<Project[]> {
        return this.projectService.readAll(id);
    }

    @Get(':id/project')
    getProject(@Param('id') id): Promise<Project[]> {
        return this.projectService.getProject(id);
    }
    //   return this.projectService.readAll(owner_id);
    // }
    
    @Post('create')
    async create(@Body() project: any): Promise<any> {
      return this.projectService.create(project);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() project: any): Promise<any> {
        let project_id = Number(id)
        delete project.project_id
        return this.projectService.update(project_id,project);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.projectService.delete(id);
    }
}
