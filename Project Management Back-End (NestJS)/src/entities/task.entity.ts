import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    task_id: number;

    @Column()
    project_id: number;

    @Column()
    task_owner: number;

    @Column()
    assigned_to: number;

    @Column()
    parent_task:number;

    @Column()
    task_name: string;

    @Column()
    task_description: string;

    @Column()
    task_status: string;

    @Column()
    task_creation:string;

    @Column()
    task_target:string;
}