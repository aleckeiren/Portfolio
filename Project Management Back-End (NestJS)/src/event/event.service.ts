import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Event } from 'src/entities/event.entity';
import { Invite } from 'src/entities/invite.entity';
import { InviteService } from 'src/invite/invite.service';
import { DeleteResult , In, LessThan, MoreThan, Not, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRes: Repository<Event>,
        private accountRes: AccountService
    ) {}
    async create(event: any): Promise<any> {
        return await this.eventRes.save(event);
    }
    
    async  read(id): Promise<any[]> {
        try {
            let events =await this.eventRes.query("SELECT e.*, CONCAT(a.first_name,' ',a.last_name) AS event_owner_name FROM Event e JOIN Account a ON a.account_id = e.event_owner WHERE e.project_id = " +id);
            return events;
        } catch (error) {
            console.log("error")
        }
    }

    async update(event_id,event: any): Promise<UpdateResult> {
        try {
            let event_info = {
                project_id: event.project_id,   
                event_owner: event.event_owner,
                event_date: event.event_date,
                event_name: event.event_name,
                event_description: event.event_description,
                event_end:event.event_end
            }
            return await this.eventRes.update(event_id,event_info);
        } catch (error) {
            console.log("Error")
        }
    }

    async delete(event): Promise<DeleteResult> {
        try {
            await this.eventRes.query("DELETE FROM commentevent WHERE event_id ="+ event);
            return await this.eventRes.delete(event);
        } catch (error) {
            console.log("Error")
        }
    }

    async deleteAll(project):Promise<any>{
        return await this.eventRes.delete({project_id:project})
    }
}
