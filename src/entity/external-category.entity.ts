import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, Unique } from 'typeorm';
import { ExternalAtInternalCategory } from './external-at-internal-category.entity';
import { User } from './user.entity';

@Entity()
@Unique(['ExternalId', 'Supplier'])
export class ExternalCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ExternalId!: string;

    @ManyToOne(() => User, (user) => user.ExternalCategories)
    Supplier: User;

    @Column()
    name!: string;
    // id поставщика

    @OneToMany(
        () => ExternalAtInternalCategory,
        (ExternalAtInternalCategory) => ExternalAtInternalCategory.ExternalCategory,
    )
    ExternalAtInternalCategory!: ExternalAtInternalCategory[];
}
