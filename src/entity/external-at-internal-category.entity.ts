import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { InternalCategory } from './internal-category.entity';
import { ExternalCategory } from './external-category.entity';

@Entity()
export class ExternalAtInternalCategory {


    @ManyToOne(() => InternalCategory, { onDelete: 'CASCADE' })
    InternalCategory!: InternalCategory;
    @PrimaryColumn()
    internalCategoryId!: string;

    @ManyToOne(() => ExternalCategory, { onDelete: 'CASCADE' })
    ExternalCategory!: ExternalCategory;
    @PrimaryColumn()
    externalCategoryId!: string;
}
