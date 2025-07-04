import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Refresh {

@PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    user!: string;

    @Column()
    expires: Date;

    @Column()
    is_revoked: boolean;
}