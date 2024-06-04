import { IsArray, IsUUID } from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  /**
   * User ID must be a valid UUID
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @IsUUID()
  userId: string;

  /**
   * Products must be an array of Product objects
   * @example [{id: "69ed8b2d-ed7c-44e1-b71a-67ac2f934fcd"}, {id: "d5f90ea8-a3be-409c-86df-98db2829af84"}]
   */
  @IsArray()
  products: Partial<Product[]>;
}
