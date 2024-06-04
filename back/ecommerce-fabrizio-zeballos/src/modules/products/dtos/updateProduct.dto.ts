import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  /**
   * Name must be a string
   * @example "Updated Product Name"
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * Description must be a string
   * @example "Updated Product Description"
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Price must be a number
   * @example 15.99
   */
  @IsOptional()
  @IsNumber()
  price?: number;

  /**
   * Stock must be a numebr
   * @example 20
   */
  @IsOptional()
  @IsNumber()
  stock?: number;

  /**
   * Image URL must be a string
   * @example https://example.com/updated-product-image.jpg
   */
  @IsOptional()
  @IsString()
  imgUrl?: string;
}
