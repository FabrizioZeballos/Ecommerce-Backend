import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  /**
   * Name must not be empty
   * @example "Product Name"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Description must not be empty
   * @example "Product Description"
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Price must be a number
   * @example 10.99
   */
  @IsNumber()
  @IsNotEmpty()
  price: number;

  /**
   * Stock must be a number
   * @example 20
   */
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  /**
   * Image URL must not be empty
   * @example https://example.com/product-image.jpg
   */
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  /**
   * Category must not be empty
   * @example Electronics
   */
  @IsString()
  @IsNotEmpty()
  category: string; // smartphone
}
