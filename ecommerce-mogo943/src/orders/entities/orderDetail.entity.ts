import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./order.entity";
import { Products } from "src/products/entities/product.entity";

@Entity({ name: 'order_details'})
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'decimal',
        precision: 10, 
        scale: 2,
    })
    price: number;

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Orders;

    @ManyToMany(() => Products)
    @JoinTable({
        name: 'order_details_products',
    })
    products: Products[]
}