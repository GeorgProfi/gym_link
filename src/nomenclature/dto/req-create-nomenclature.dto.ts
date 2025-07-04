import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { Product } from '../../entity/product.entity';

export class ReqCreateNomenclatureDto {
    @IsString()
    @IsDefined()
    @ApiProperty({ description: '', default: 'For A Gym' })
    name: string;

    @IsString()
    @IsDefined()
    @ApiProperty({ description: 'товары номенклотруры', default: '[]' })
    products: Product[];
}
