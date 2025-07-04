import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { ReqCreateNomenclatureDto } from './req-create-nomenclature.dto';
//import { ReqUpdateUserDto } from './req-create-nomenclature.dto';

export class ResUpdateNomenclatureDto extends ReqCreateNomenclatureDto {
    @ApiProperty({ description: 'name ', default: 'Мой Склад' })
    @IsUUID()
    @IsDefined()
    id: string;

}
