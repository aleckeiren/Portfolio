import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Invite {
    @PrimaryGeneratedColumn()
    invite_id: number;

    @Column()
    event_id: number;

    @Column()
    is_accepted: Boolean;

    @Column()
    account_id: number;

}