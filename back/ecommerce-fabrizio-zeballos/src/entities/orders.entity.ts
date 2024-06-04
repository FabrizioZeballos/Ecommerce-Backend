import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity({ name: 'orders' })
export class Order {
  /**
   * The unique identifier for the order.
   * It is generated automatically as a UUID.
   *
   * @example "d4a20c8d-93ef-4c7b-9480-71f4c6299f3f"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The user who made the order.
   * This is a Many-to-One relationship with the User entity.
   */
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  /**
   * The date and time when the order was made.
   * This is stored as a Date object.
   *
   * @example "2024-04-22T10:00:00Z"
   */
  @Column()
  date: Date;

  /**
   * The order detail associated with the order.
   * This is a One-to-One relationship with the OrderDetail entity.
   * The `JoinColumn` decorator specifies the foreign key in the database.
   */
  @OneToOne(() => OrderDetail)
  @JoinColumn()
  orderDetail: OrderDetail;
}
