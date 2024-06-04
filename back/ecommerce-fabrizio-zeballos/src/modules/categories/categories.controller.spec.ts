import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from '../../entities/categories.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  let mockCategories: Category[] = [
    {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
      name: 'smartphone',
      products: [],
    },
    {
      id: '2a3b4c5d-6e7f-8g9h-0i1j-k2l3m4n5o6p7',
      name: 'mouse',
      products: [],
    },
    {
      id: '3a4b5c6d-7e8f-9g0h-1i2j-k3l4m5n6o7p8',
      name: 'monitor',
      products: [],
    },
  ];

  let mockService: Partial<CategoriesService> = {
    getCategories: () => Promise.resolve(mockCategories),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: mockService }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categories = await controller.getCategories();

      expect(categories).toEqual(mockCategories);
      expect(categories).toBeInstanceOf(Array);
    });
  });
});
