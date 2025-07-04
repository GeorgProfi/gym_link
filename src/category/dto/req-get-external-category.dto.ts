import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class ReqGetExternalCategoryDto {
    @ApiProperty({ description: 'CMS', default: 'Мой Склад' })
    @IsString()
    @IsDefined()
    CMS: string;

    @IsString()
    @IsDefined()
    @ApiProperty({ description: 'api ключ к моему складу', default:'4cb41a30b5b7435e68e4ffd0667c20d3e59ef6e2' })

    apiKey: string;
}
