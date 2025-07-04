import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Refresh } from '../entity/refresh.entity';
import { ExternalCategory } from '../entity/external-category.entity';
import { PassportModule } from '@nestjs/passport';
import { InternalCategory } from '../entity/internal-category.entity';
import { ExternalAtInternalCategory } from '../entity/external-at-internal-category.entity';
import { NomenclatureService } from './nomenclature.service';
import { NomenclatureController } from './nomenclature.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Refresh,
            ExternalCategory,
            InternalCategory,
            ExternalAtInternalCategory,
        ]),
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
        // MailModule,
    ],
    providers: [NomenclatureService],
    controllers: [NomenclatureController],
    exports: [NomenclatureService],
})
export class NomenclatureModule {}
