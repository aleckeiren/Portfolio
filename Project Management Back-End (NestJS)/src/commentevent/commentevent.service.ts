import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Commentevent } from 'src/entities/commentevent.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CommentEventService {
    constructor(
        @InjectRepository(Commentevent)
        private commentEventRes: Repository<Commentevent>,
        private accountService:AccountService
    ) {}
    async create(comment: any): Promise<any> {
        await this.commentEventRes.save(comment)
        return this.readComments(comment.event_id);
    }
    
    async  readAll(): Promise<any[]> {
        return await this.commentEventRes.find();
    }
    async  readComments(id): Promise<any[]> {
        try {
            let comments = await this.commentEventRes.query("SELECT c.*,a.first_name,a.last_name FROM Commentevent c JOIN Account a ON a.account_id = c.account_id WHERE c.event_id =" + id);
            return comments;
        } catch (error) {
            console.log("Error")
        }
    }

    async update(comment: any): Promise<UpdateResult> {

        return await this.commentEventRes.update(comment.event_comment_id,comment);
    }

    async delete(comment_id): Promise<DeleteResult> {
        return await this.commentEventRes.delete(comment_id);
    }
}
