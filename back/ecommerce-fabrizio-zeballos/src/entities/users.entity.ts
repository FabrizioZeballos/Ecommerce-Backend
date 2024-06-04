import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  /**
   * The unique identifier for the user.
   * It is generated automatically as a UUID.
   *
   * @example "c4e20b8e-23ef-4b7b-9380-61a5c7299f4f"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the user.
   * Must be a string up to 50 characters long.
   * Cannot be null.
   *
   * @example "John Doe"
   */
  @Column({ length: 50, nullable: false })
  name: string;

  /**
   * The email address of the user.
   * Must be unique and cannot be null.
   *
   * @example "john.doe@example.com"
   */
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  /**
   * The hashed password for the user.
   * Must be a string up to 60 characters long.
   * Cannot be null.
   *
   * @example "$2b$12$WJovRBOg"
   */
  @Column({ length: 60, nullable: false })
  password: string;

  /**
   * Indicates whether the user has administrative privileges.
   * Defaults to false.
   *
   * @example false
   */
  @Column({ default: false })
  isAdmin: boolean;

  /**
   * The phone number of the user.
   * Stored as a bigint.
   *
   * @example 1234567890
   */
  @Column('bigint')
  phone: number;

  /**
   * The address of the user.
   * Stored as a text.
   *
   * @example "123 Main St, Anytown"
   */
  @Column('text')
  address: string;

  /**
   * The country of the user.
   * Must be a string up to 50 characters long.
   * Can be null.
   *
   * @example "USA"
   */
  @Column({ length: 50, nullable: true })
  country: string;

  /**
   * The city of the user.
   * Must be a string up to 50 characters long.
   * Can be null.
   *
   * @example "New York"
   */
  @Column({ length: 50, nullable: true })
  city: string;

  /**
   * A list of orders made by the user.
   * This is a One-to-Many relationship with the Order entity.
   */
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
