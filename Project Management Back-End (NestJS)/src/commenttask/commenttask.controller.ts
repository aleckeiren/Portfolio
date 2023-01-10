import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentTaskService } from './commenttask.service';

@Controller('commenttask')
export class CommenttaskController {
    constructor(private commentTaskService: CommentTaskService){
    }
    @Get()
    read(): Promise<any[]> {
      return this.commentTaskService.readAll();
    }

    @Get(':id/readcomments')
    readComments(@Param('id') id): Promise<any[]> {
      return this.commentTaskService.readComments(id);
    }
    @Post('create')
    async create(@Body() comment: any): Promise<any> {
      return this.commentTaskService.create(comment);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() comment: any): Promise<any> {
        return this.commentTaskService.update(comment);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.commentTaskService.delete(id);
    }
}
