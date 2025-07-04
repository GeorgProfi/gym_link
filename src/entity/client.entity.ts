import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ERole } from '../shared/enums/role.enum';

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    Gym_id!: string;

    @Column()
    External_id!: string;

    @Column({ unique: true, nullable: true })
    login!: string;
}
