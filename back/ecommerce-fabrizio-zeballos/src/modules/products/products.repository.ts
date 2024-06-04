import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products: Product[] = await this.productsRepository.find();

    return products;
  }

  async addProducts(newProduct: Product): Promise<void> {
    await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(newProduct)
      .orIgnore()
      .execute();
  }

  async getProductById(id: string): Promise<Product> {
    const product: Product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    return product;
  }

  async createProduct(newProduct: Product): Promise<Product> {
    return await this.productsRepository.save(newProduct);
  }

  async updateProduct(product: Product): Promise<Product> {
    return await this.productsRepository.save(product);
  }

  async deleteProduct(product: Product): Promise<Product> {
    return await this.productsRepository.remove(product);
  }
}
