import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Membership } from 'src/entities/membership.entity';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
    constructor(private membershipService: MembershipService){
    }
    @Get(':id/read')
    read(@Param('id') id): Promise<Membership[]> {
        return this.membershipService.readAll(id);
    }

    @Get(':id/project')
    getProject(@Param('id') id): Promise<Membership[]> {
        return this.membershipService.getMembership(id);
    }
    //   return this.projectService.readAll(owner_id);
    // }
    @Get(':id/invites')
    readAccountInfo(@Param('id') id): Promise<Membership[]> {
        return this.membershipService.readProjectInfo(id);
    }
    
    @Post('create')
    async create(@Body() membership: any): Promise<any> {
      return this.membershipService.create(membership);
    }
    @Post('create/newproject')
    async createNewProject(@Body() membership: any): Promise<any> {
      return this.membershipService.createNewProject(membership);
    }  
    
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() membership: any): Promise<any> {
        let membership_id = Number(id)
        delete membership.account_info
        delete membership.membership_id
        return await this.membershipService.update(membership,membership_id);
    }  
    
    @Put(':id/delete')
    async delete(@Param('id') id, @Body() membership: any): Promise<any> {
      return this.membershipService.delete(id,membership);
    }

    @Delete(':id/deleteAll')
    async deleteAll(@Param('id') id): Promise<any> {
      return this.membershipService.deleteAll(id);
    }
}
