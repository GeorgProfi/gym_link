import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './entity/user.entity';
import { Refresh } from './entity/refresh.entity';
import { JwtModule } from '@nestjs/jwt';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { PaymentModule } from './payment/payment.module';
import { CommonModule } from './common.module';
import { ExternalCategory } from './entity/external-category.entity';
import { AuthModule } from './auth/auth.module';
import { InternalCategory } from './entity/internal-category.entity';
import { ExternalAtInternalCategory } from './entity/external-at-internal-category.entity';
import { UserModule } from './user/user.module';
import { NomenclatureModule } from './nomenclature/nomenclature.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.get('typeorm'),
        }),
        AuthModule,
        CategoryModule,
        TypeOrmModule.forFeature([
            User,
            Refresh,
            ExternalCategory,
            InternalCategory,
            ExternalAtInternalCategory,
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
        CategoryModule,
        PaymentModule,
        CommonModule,
        UserModule,
        NomenclatureModule,
    ],
    controllers: [AuthController, CategoryController],
    providers: [AuthService, CategoryService],
})
export class AppModule {}
