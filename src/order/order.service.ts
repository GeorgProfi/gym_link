import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';

import { config as dotenvConfig } from 'dotenv';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/entity/product.entity';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { ProductAtOrder } from 'src/entity/product-at-order.entity';
import { Gym } from 'src/entity/gym.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRep: Repository<Order>,
        @InjectRepository(Product)
        private productRep: Repository<Product>,
        @InjectRepository(Gym)
        private gymRep: Repository<Gym>,
        @InjectRepository(ProductAtOrder)
        private productAtOrderRep: Repository<ProductAtOrder>,
        private readonly paymentService: PaymentService,
    ) {}

    async createOrderAndGetPaymentForm(orderDto: OrderDto) {

        const gym = await this.gymRep.findOne({ where: { token: orderDto.token } });
        if (!gym) throw new BadRequestException();
        const { id } = gym;
        
        const newOrder =  await this.orderRep.save({
            Gym_id: id,
            Client_id: orderDto.client_id,
            date: orderDto.date,
        });

        await this.productAtOrderRep.save(
            orderDto.products.map(product => ({
                orderId: newOrder.id,
                productId: product.id,
                count: product.count,
            }))
        );

        // СДЕЛАТЬ ПОЛЕ currency У ПОСТАВЩИКА также добавить параметры для чека в  createPaymentObject
        // добавить metadata в createPaymentObject https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-true
        
        
        // const createPaymentObject: CreatePaymentDto = {
        //     amount: {
        //         value: await this.getAmountByProdutsIds(orderDto.products),
        //         currency: 'RUB',
        //     },
        //     capture: false,
        //     confirmation: {
        //         type: 'redirect', //'embedded'
        //         locale: "ru_RU",
        //     },
        //     description: '',
        // }
        
        // const payment = await this.paymentService.getPaymentForm(createPaymentObject, newOrder.id);

        // return payment.confirmation;
        return;
    }

    //переделать с учетом количества
    // async getAmountByProdutsIds(products: ProductDto[]) {
    //     const productsPrices = await this.productRep.find({
    //         where: {
    //           id: In(productsIds),
    //         },
    //         select: ['price'],
    //       });
        
    //     return (productsPrices.reduce((total, product) => total + product.price, 0) / 100).toString();
    // }

}
