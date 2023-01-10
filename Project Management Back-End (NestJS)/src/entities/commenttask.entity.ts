import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Commenttask {
    @PrimaryGeneratedColumn()
    task_comment_id: number;

    @Column()
    task_id: number;

    @Column()
    account_id: number;

    @Column()
    comment_content: string;

    @Column()
    comment_date: string;
}