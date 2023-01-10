import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    project_id: number;

    @Column()
    project_name:string;

    @Column()
    project_owner:number;

    @Column()
    project_description:string;

    @Column()
    project_start:string;

    @Column()
    project_target:string;

    @Column()
    project_status:string;
}