import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gym {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    address: string;

    @Column()
    token: string;

}
