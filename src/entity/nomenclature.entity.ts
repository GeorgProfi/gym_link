import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { NomenclatureAtProduct } from './nomenclature-at-product.entity';

@Entity()
export class Nomenclature {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name!: string;

    @OneToMany(
        () => NomenclatureAtProduct,
        (nomenclatureAtProduct) => nomenclatureAtProduct.Nomenclature,
    )
    NomenclatureAtProduct!: NomenclatureAtProduct[];
}
