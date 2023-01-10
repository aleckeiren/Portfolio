import { Invite } from 'src/entities/invite.entity';
import { InviteService } from './invite.service';
import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';

@Controller('invite')
export class InviteController {
    constructor(private inviteService: InviteService){
    }
    @Get(':id/read')
    read(@Param('id') id): Promise<Invite[]> {
        return this.inviteService.readAll(id);
    }  
    //   return this.projectService.readAll(owner_id);
    // }
    @Get(':id/events')
    getProjectEvents(@Param('id') id): Promise<Invite[]> {
        return this.inviteService.getProjectEvents(id);
    }

    @Get(':id/invited')
    readInvited(@Param('id') id): Promise<Invite[]> {
        return this.inviteService.readInvited(id);
    }

    @Post('create')
    async create(@Body() invite: Invite): Promise<any> {
      return this.inviteService.create(invite);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() invite: Invite): Promise<any> {
        return this.inviteService.update(invite);
    }  
    
    
    @Get(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.inviteService.delete(id);
    }
    @Delete(':id/destroy')
    async destroy(@Param('id') id): Promise<any> {
      return this.inviteService.destroy(id);
    }
    @Get(':id/deleteall')
    async deleteAll(@Param('id') id): Promise<any> {
      return this.inviteService.delete(id);
    }
}
