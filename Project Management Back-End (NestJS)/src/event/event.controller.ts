import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';
import { Event } from 'src/entities/event.entity';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService){
    }
    @Get(':id/read')
    read(@Param('id') id): Promise<Event[]> {
        return this.eventService.read(id);
    }  
    //   return this.projectService.readAll(owner_id);
    // }
    
    @Post('create')
    async create(@Body() event: any): Promise<any> {
      return this.eventService.create(event);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() event: any): Promise<any> {
        let event_id = Number(id);
        return this.eventService.update(event_id,event);
    }  
    
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.eventService.delete(id);
    }
}
