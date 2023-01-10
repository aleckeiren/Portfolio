import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    account_id: number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    photo: string;
}