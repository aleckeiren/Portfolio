import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    file_id: number;

    @Column()
    project_id: number;

    @Column()
    file_name: string;

    @Column({ type: 'bytea' })
    file_data: Uint8Array;

    @Column()
    file_uploader: number;
    @Column()
    file_type: string;
}