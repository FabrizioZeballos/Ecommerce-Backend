import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './categories.entity';

@Entity({ name: 'products' })
export class Product {
  /**
   * The unique identifier for the product.
   * It is generated automatically as a UUID.
   *
   * @example "b5f21a8e-4aef-4d5b-8380-51f2c72b9f1d"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the product.
   * Must be a string up to 50 characters long and unique.
   * Cannot be null.
   *
   * @example "Wireless Mouse"
   */
  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  /**
   * The description of the product.
   * Stored as text.
   * Cannot be null.
   *
   * @example "An ergonomic wireless mouse with adjustable DPI."
   */
  @Column({ type: 'text', nullable: false })
  description: string;

  /**
   * The price of the product.
   * Stored as a decimal with precision of 10 and scale of 2.
   * Cannot be null.
   *
   * @example 29.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * The stock quantity of the product.
   * Stored as an integer.
   * Cannot be null.
   *
   * @example 100
   */
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   * The URL of the product image.
   * Defaults to a sample URL if not provided.
   *
   * @example "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
   */
  @Column({
    default:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  imgUrl: string;

  /**
   * The category associated with the product.
   * This is a Many-to-One relationship with the Category entity.
   */
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
