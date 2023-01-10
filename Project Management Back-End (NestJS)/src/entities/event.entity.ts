import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    event_id: number;

    @Column()
    project_id: number;

    @Column()
    event_owner: number;

    @Column()
    event_date: string;

    @Column()
    event_name: string;

    @Column()
    event_description: string;

    @Column()
    event_end:string;
}