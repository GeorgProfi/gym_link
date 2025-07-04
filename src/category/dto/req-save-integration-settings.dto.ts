import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsJSON, IsString, IsUUID } from 'class-validator';
import typeorm from '../../config/typeorm';

export class ReqSaveIntegrationSettingsDto {
    @ApiProperty({
        description: 'internalCategoryId',
        default: '7d48b9b1-cdbb-41d9-a600-6d5e04044e2f',
        example: '7d48b9b1-cdbb-41d9-a600-6d5e04044e2f',
    })
    @IsUUID()
    @IsDefined()
    internalCategoryId: string;

    @ApiProperty({
        description: 'externalCategoryId',
        default: '39b0f197-0d62-49b1-94fb-114c98efbe56',
        example: ['fdc4f41f-86e8-459b-a8dc-961508383fdc', '6da9fcf0-a58b-43c3-a2cd-a313952fcea6'],
    })
    @IsUUID('all', { each: true })
    externalCategoryId: string[];
}
