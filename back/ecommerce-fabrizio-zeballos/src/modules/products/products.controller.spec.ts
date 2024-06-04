import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/products.entity';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('ProductsController', () => {
  let controller: ProductsController;

  let productMock: Product = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Laptop',
    description: 'Powerful laptop for all your computing needs',
    price: 999.99,
    stock: 10,
    imgUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    category: {
      id: '3d5c15c7-bb10-4fc4-9c7f-f3ab476dfe83',
      name: 'Electronics',
      products: [],
    },
  };

  let mockUpdateProduct: Partial<UpdateProductDto> = {
    name: 'Laptop',
  };

  let serviceMock: Partial<ProductsService> = {
    getProductById: (id: string): Promise<Product> =>
      Promise.resolve(productMock),

    updateProduct: (id: string, productData: UpdateProductDto) =>
      Promise.resolve(productMock),
  };

  let guardMock: Partial<AuthGuard> = {
    canActivate: (
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> =>
      Promise.resolve(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        JwtService,
        {
          provide: ProductsService,
          useValue: serviceMock,
        },
        {
          provide: AuthGuard,
          useValue: guardMock,
        },
        {
          provide: RolesGuard,
          useValue: guardMock,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(' getProductById', () => {
    it('should return a Product', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';

      const result = await controller.getProductById(id);

      expect(result).toEqual(productMock);
      expect(result).toBeInstanceOf(Object);
    });

    it('should return an updated Product', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';

      const result = await controller.updateProduct(id, mockUpdateProduct);

      expect(result).toEqual(productMock);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
