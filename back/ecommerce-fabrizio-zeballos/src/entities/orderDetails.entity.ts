import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './products.entity';

@Entity({ name: 'order_details' })
export class OrderDetail {
  /**
   * The unique identifier for the order detail.
   * It is generated automatically as a UUID.
   *
   * @example "b4d20b8e-43ef-4d7b-9380-71f5c7299f5e"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The price of the order detail.
   * Stored as a decimal with precision of 10 and scale of 2.
   * Cannot be null.
   *
   * @example 59.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * A list of products associated with the order detail.
   * This is a Many-to-Many relationship with the Product entity.
   * The `JoinTable` decorator specifies the join table for the many-to-many relationship.
   */
  @ManyToMany(() => Product)
  @JoinTable({ name: 'order_details_products' })
  products: Product[];
}
