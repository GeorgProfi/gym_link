import { Body, Controller, Post, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import * as util from 'util';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { PaymentService } from 'src/payment/payment.service';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';


@ApiTags('order')
@Controller('/order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {}

    @ApiOperation({
        description: 'Создать заказ',
    })
    @UseGuards()
    @Post('/create-order')
    async createOrder(@Body() orderDto: OrderDto) {
        console.log(orderDto);
        return await this.orderService.createOrderAndGetPaymentForm(orderDto);
    }
}
