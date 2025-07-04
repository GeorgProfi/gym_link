import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class CMS {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    CMS!:string

}
