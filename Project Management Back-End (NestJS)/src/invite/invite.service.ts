import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Invite } from 'src/entities/invite.entity';
import { EventService } from 'src/event/event.service';
import { ProjectService } from 'src/project/project.service';
import { DeleteResult, Not, Repository, UpdateResult } from 'typeorm';
@Injectable()
export class InviteService {
    constructor(
        @InjectRepository(Invite)
        private inviteRes: Repository<Invite>,
        private eventService:EventService,
        private accountService: AccountService,
        private projectService: ProjectService
    ) {}
    async create(invite: Invite): Promise<Invite> {
        return await this.inviteRes.save(invite);
    }
    
    async  readAll(id): Promise<Invite[]> {
        try {
            let invites = await this.inviteRes.query("SELECT i.*, e.*,(SELECT CONCAT(a2.first_name,' ',a2.last_name) FROM Account a2 WHERE a2.account_id = e.event_owner) AS event_owner_name ,p.*,a.first_name,a.last_name FROM Invite i JOIN Event e ON i.event_id = e.event_id JOIN Project p ON p.project_id = e.project_id JOIN Account a ON a.account_id = i.account_id WHERE i.account_id =" +id);
            return invites
        } catch (error) {
            console.log("Error")
        }
        
    }

    async  readInvited(id): Promise<Invite[]> {
        try {
            let invites = await this.inviteRes.query("SELECT i.*, a.first_name, a.last_name, a.email FROM Invite i JOIN Account a ON a.account_id = i.account_id WHERE i.event_id = " + id)
            return invites
        } catch (error) {
            console.log("Error")
        }
        
    }


    async getProjectEvents(id){
        try {
            let events = await this.eventService.read(id);
            return events;            
        } catch (error) {
            console.log("Error")
        }

    }

    async update(invite: Invite): Promise<UpdateResult> {
        try {
            return await this.inviteRes.update(invite.invite_id,invite);
        } catch (error) {
            console.log("Error")
        }
        
    }

    async delete(invite): Promise<DeleteResult> {
        try {
            return await this.inviteRes.delete(invite);
        } catch (error) {
            console.log("Error")
        }
        
    }
    async destroy(event_id): Promise<DeleteResult> {
        try {
            await this.eventService.delete(event_id);
            return await this.inviteRes.delete({event_id:event_id});
        } catch (error) {
            console.log("Error")
        }
        
    }

    async deleteInvite(event_id,account_id){
        try {
            return await this.inviteRes.delete({event_id:event_id,account_id:account_id});
        } catch (error) {
            console.log("Error")
        }
    }

    async deleteAll(event_id): Promise<DeleteResult> {
        try {
            return await this.inviteRes.delete({event_id:event_id});
        } catch (error) {
            console.log("Error")
        }
        
    }
}
