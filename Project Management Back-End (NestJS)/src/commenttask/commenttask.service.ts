import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { Commenttask } from 'src/entities/commenttask.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CommentTaskService {
    constructor(
        @InjectRepository(Commenttask)
        private commentTaskRes: Repository<Commenttask>,
        private accountService:AccountService
    ) {}
    async create(comment: any): Promise<any> {
        await this.commentTaskRes.save(comment)
        return this.readComments(comment.task_id);
    }
    
    async  readAll(): Promise<any[]> {
        return await this.commentTaskRes.find();
    }
    async  readComments(id): Promise<any[]> {
        try {
            let comments = await this.commentTaskRes.query("SELECT c.*,a.first_name,a.last_name FROM Commenttask c JOIN Account a ON a.account_id = c.account_id WHERE c.task_id =" + id);
            return comments;
        } catch (error) {
            console.log("Error")
        }
    }

    async update(comment: any): Promise<UpdateResult> {

        return await this.commentTaskRes.update(comment.task_comment_id,comment);
    }

    async delete(comment_id): Promise<DeleteResult> {
        return await this.commentTaskRes.delete(comment_id);
    }
}
