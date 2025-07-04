import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';

import { config as dotenvConfig } from 'dotenv';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { v4 as uuidv4 } from 'uuid';
import { NotificationDto } from './dto/notification.dto';
import { PaymentDto } from './dto/payment.dto';


@Injectable()
export class PaymentService {
    constructor(
    ) {
        dotenvConfig({ path: '.env' });
    }

    async getPaymentForm(createPaymentDto: CreatePaymentDto, idempotenceKey: string) {
        // для 54 фз тут еще надо receiptов и еще чето для чеков передавать
        const yookassApiUrl: string = process.env.YOOKASSA_API_URL;
        const yookassaSecretKey: string = process.env.YOOKASSA_SECRET_KEY;

        const f = await fetch(yookassApiUrl, {
            method: 'POST',
            headers: {
                'Idempotence-Key': idempotenceKey,
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Basic ${yookassaSecretKey}`,
            },
            body: JSON.stringify(createPaymentDto),
        });

        const response = await f.json() as PaymentDto;
        console.log(response.confirmation);
        return response;
    }

    async processStateOfThePaymentObject(notification: NotificationDto) {return notification}
}
