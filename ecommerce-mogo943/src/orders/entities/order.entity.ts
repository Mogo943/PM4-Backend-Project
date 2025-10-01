import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetail.entity";
import { Users } from "src/users/entities/user.entity";

@Entity({ name: 'orders' })
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => Users, (user) => user.order)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;
}
