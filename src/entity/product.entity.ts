import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { InternalCategory } from './internal-category.entity';
import { NomenclatureAtProduct } from './nomenclature-at-product.entity';
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    count: number;

    @Column()
    price: number;


    @ManyToOne(() => InternalCategory, (internalCategory) => internalCategory.products)
    category: InternalCategory;
    @Column()
    categoryId: string;
    @OneToMany(
        () => NomenclatureAtProduct,
        (nomenclatureAtProduct) => nomenclatureAtProduct.Product,
    )
    NomenclatureAtProduct!: NomenclatureAtProduct[];
}
