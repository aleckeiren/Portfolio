import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Commentevent {
    @PrimaryGeneratedColumn()
    event_comment_id: number;

    @Column()
    event_id: number;

    @Column()
    account_id: number;

    @Column()
    comment_content: string;

    @Column()
    comment_date: string;
}