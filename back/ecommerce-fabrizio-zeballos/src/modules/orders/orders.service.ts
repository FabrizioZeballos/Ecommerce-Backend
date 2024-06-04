import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from '../../entities/orders.entity';
import { User } from '../../entities/users.entity';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repository';
import { Product } from '../../entities/products.entity';
import { OrderDetail } from '../../entities/orderDetails.entity';
import { CreateOrderDto } from './dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async getOrderById(id: string): Promise<Order> {
    const order: Order = await this.ordersRepository.getOrderById(id);

    if (!order) throw new NotFoundException('Order not found');

    const {
      orderDetail: { products },
    } = order;

    products.forEach((product) => delete product.stock);

    delete order.user.password;
    delete order.user.isAdmin;

    return order;
  }

  async addOrder(order: CreateOrderDto): Promise<Partial<OrderDetail>> {
    const { userId, products } = order;

    const user: User = await this.usersRepository.getUserById(userId);

    if (!user) throw new NotFoundException('User not found');

    delete user.password;
    delete user.isAdmin;

    const orderDate = new Date();

    const actualProducts: Product[] = [];

    for (const product of products) {
      const actualProduct: Product =
        await this.productsRepository.getProductById(product.id);

      if (actualProduct.stock === 0) continue;

      actualProduct.stock = actualProduct.stock - 1;

      const article =
        await this.productsRepository.updateProduct(actualProduct);

      actualProducts.push(article);
    }

    if (!actualProducts.length)
      throw new BadRequestException('The product is out of stock.');

    const totalPrice: number = actualProducts.reduce((acc, product) => {
      return acc + Number(product.price);
    }, 0);

    const orderDetail: OrderDetail = new OrderDetail();
    orderDetail.price = totalPrice;
    orderDetail.products = actualProducts;

    const newOrderDetail: OrderDetail =
      await this.ordersRepository.createOrderDetails(orderDetail);

    const newOrder: Order = new Order();
    newOrder.user = user;
    newOrder.date = orderDate;
    newOrder.orderDetail = newOrderDetail;

    await this.ordersRepository.addOrder(newOrder);

    const { id, price } = orderDetail;

    return { id, price };
  }
}
