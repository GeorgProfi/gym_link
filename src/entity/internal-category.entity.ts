import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ExternalAtInternalCategory } from './external-at-internal-category.entity';
import { Product } from './product.entity';

@Entity()
export class InternalCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name!: string;

    @OneToMany(() => Product, (product) => product.id)
    products: Product[];

    @OneToMany(
        () => ExternalAtInternalCategory,
        (ExternalAtInternalCategory) => ExternalAtInternalCategory.InternalCategory,
    )
    ExternalAtInternalCategory!: ExternalAtInternalCategory[];
}
