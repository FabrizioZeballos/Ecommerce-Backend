import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/orders.dto';
import { Order } from '../../entities/orders.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderDetail } from '../../entities/orderDetails.entity';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async addOrder(@Body() order: CreateOrderDto): Promise<Partial<OrderDetail>> {
    return await this.ordersService.addOrder(order);
  }
}
