import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './products.entity';

@Entity({ name: 'categories' })
export class Category {
  /**
   * The unique identifier for the category.
   * It is generated automatically as a UUID.
   *
   * @example "a3e20b9e-12af-4d5b-9380-71e5b7299f4e"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the category.
   * Must be a string up to 50 characters long and unique.
   * Cannot be null.
   *
   * @example "Electronics"
   */
  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  /**
   * A list of products that belong to this category.
   * This is a One-to-Many relationship with the Product entity.
   */
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
