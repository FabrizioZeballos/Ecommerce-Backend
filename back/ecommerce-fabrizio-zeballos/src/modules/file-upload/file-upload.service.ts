import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsRepository } from '../products/products.repository';
import { Product } from '../../entities/products.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    const { url } = await this.fileUploadRepository.uploadImage(file);

    const product: Product = await this.productsRepository.getProductById(id);

    if (!product) throw new NotFoundException('Product not found');

    product.imgUrl = url;

    const updatedProduct: Product =
      await this.productsRepository.updateProduct(product);

    return updatedProduct;
  }
}
