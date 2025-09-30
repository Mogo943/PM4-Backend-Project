import { Categories } from "src/categories/entities/category.entity";
import { OrderDetails } from "src/orders/entities/orderDetail.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    @Column({
        type: 'text',
        default: 'No Image'
    })
    imgUrl?: string;

    @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetails[];
    
    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Categories;
}
