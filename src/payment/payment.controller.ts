import { Body, Controller, Post, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import * as util from 'util';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { NotificationDto } from './dto/notification.dto';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('payment')
@Controller('/payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @ApiOperation({
        description: 'Отправить уведомление о состоянии объекта платежа (Сюда уведомления шлет платежный сервис)',
    })
    @UseGuards()
    @HttpCode(200)
    @Post('/provide_state_of_the_payment_object')
    async provideStateOfThePaymentObject(@Body() notificationDto: NotificationDto) {
        console.log(notificationDto);
        this.paymentService.processStateOfThePaymentObject(notificationDto);
    }

    
    @ApiOperation({
        description: 'Проверить работу платежки',
    })
    @Post('/createTestPayment')
    async check(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.getPaymentForm(createPaymentDto, uuidv4());
    }
}
