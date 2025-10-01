import { Orders } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  phone: number;
  
  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country?: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city?: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  order: Orders[]
}
