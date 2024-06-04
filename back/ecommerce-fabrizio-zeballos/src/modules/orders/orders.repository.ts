import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from '../../entities/orderDetails.entity';
import { Order } from '../../entities/orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  async getOrderById(id: string): Promise<Order> {
    const order: Order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        user: true,
        orderDetail: { products: true },
      },
    });

    return order;
  }

  async addOrder(newOrder: Order): Promise<Order> {
    return await this.ordersRepository.save(newOrder);
  }

  async createOrderDetails(orderDetail: OrderDetail) {
    return await this.orderDetailsRepository.save(orderDetail);
  }
}
