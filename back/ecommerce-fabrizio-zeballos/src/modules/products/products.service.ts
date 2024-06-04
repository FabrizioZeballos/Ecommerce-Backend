import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { Product } from '../../entities/products.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { Category } from '../../entities/categories.entity';
import * as data from '../../data.json';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getProducts(page?: number, limit?: number): Promise<Product[]> {
    const products: Product[] = await this.productsRepository.getProducts();

    if (!products.length) throw new NotFoundException('Products not found');

    const start = (page - 1) * limit;
    const end = start + limit;

    const productsSlice = products.slice(start, end);

    return productsSlice;
  }

  async addProducts(): Promise<string> {
    const categories: Category[] =
      await this.categoriesRepository.getCategories();

    data?.map(async (product) => {
      const category = categories.find(
        (category) => product.category === category.name,
      );

      const newProduct = new Product();
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.stock = product.stock;
      newProduct.imgUrl = product.imgUrl;
      newProduct.category = category;

      await this.productsRepository.addProducts(newProduct);
    });

    return 'Products added';
  }

  async getProductById(id: string): Promise<Product> {
    const product: Product = await this.productsRepository.getProductById(id);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async createProduct(product: CreateProductDto): Promise<string> {
    const categories: Category[] =
      await this.categoriesRepository.getCategories();

    const category: Category = categories.find((category) => {
      return category.name === product.category;
    });

    const newProduct: Product = new Product();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.stock = product.stock;
    newProduct.imgUrl = product.imgUrl;
    newProduct.category = category;

    const createdProduct =
      await this.productsRepository.createProduct(newProduct);

    return createdProduct.id;
  }

  async updateProduct(
    id: string,
    productData: UpdateProductDto,
  ): Promise<Product> {
    const product: Product = await this.productsRepository.getProductById(id);

    if (!product) throw new NotFoundException('Product not found');

    product.name = productData.name ?? product.name;
    product.description = productData.description ?? product.description;
    product.price = productData.price ?? product.price;
    product.stock = productData.stock ?? product.stock;
    product.imgUrl = productData.imgUrl ?? product.imgUrl;

    return await this.productsRepository.updateProduct(product);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product: Product = await this.productsRepository.getProductById(id);

    if (!product) throw new NotFoundException('Product not found');

    return await this.productsRepository.deleteProduct(product);
  }
}
