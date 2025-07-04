import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    Gym_id!: string;

    @Column()
    Client_id!: string;

    @Column()
    date!: Date;
}