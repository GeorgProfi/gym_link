import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class ProductAtOrder {
    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    product!: Product;
    @PrimaryColumn()
    productId!: string;

    
    @ManyToOne(() => Order, { onDelete: 'CASCADE' })
    order!: Order;
    @PrimaryColumn()
    orderId!: string;

    @Column()
    count: number;
}