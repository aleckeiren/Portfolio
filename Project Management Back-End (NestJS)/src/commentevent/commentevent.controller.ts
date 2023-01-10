import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Commentevent } from 'src/entities/commentevent.entity';
import { CommentEventService } from './commentevent.service';

@Controller('commentevent')
export class CommenteventController {
    constructor(private commentEventService: CommentEventService){
    }
    @Get()
    read(): Promise<any[]> {
      return this.commentEventService.readAll();
    }

    @Get(':id/readcomments')
    readComments(@Param('id') id): Promise<any[]> {
      return this.commentEventService.readComments(id);
    }
    @Post('create')
    async create(@Body() comment: any): Promise<any> {
      return this.commentEventService.create(comment);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() comment: any): Promise<any> {
        return this.commentEventService.update(comment);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.commentEventService.delete(id);
    }
}
