import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Nomenclature } from './nomenclature.entity';

@Entity()
export class NomenclatureAtProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    Product!: Product;
    //productId!: string;

    @ManyToOne(() => Nomenclature, { onDelete: 'CASCADE' })
    Nomenclature!: Nomenclature;
    //nomenclatureId!: string;
}
