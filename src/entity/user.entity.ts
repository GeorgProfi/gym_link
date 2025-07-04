import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ERole } from '../shared/enums/role.enum';
import { ExternalCategory } from './external-category.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Мыло
    @Column()
    email: string;

    // Пароль
    @Column()
    password: string;

    @OneToMany(() => ExternalCategory, (exCategory) => exCategory.Supplier)
    ExternalCategories: ExternalCategory[];

    @Column({ enum: ERole, default: ERole.seller })
    role!: ERole;

    @DeleteDateColumn()
    deletedAt!: Date;
}
