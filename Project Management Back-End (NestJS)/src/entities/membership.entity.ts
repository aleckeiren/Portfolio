import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Membership {
    @PrimaryGeneratedColumn()
    membership_id: number;

    @Column()
    account_id:number;

    @Column()
    project_id:number;

    @Column()
    add_del_task:boolean;

    @Column()
    add_del_event:boolean;

    @Column()
    edit_project:boolean;

    @Column()
    add_del_member:boolean;
}