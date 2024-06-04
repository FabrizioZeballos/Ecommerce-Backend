import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from '../../entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.getCategories();
  }

  async addCategories(): Promise<string> {
    await this.categoriesRepository.addCategories();

    return 'Categories added';
  }
}
