import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';

export class threeDSecureDto {
    @IsBoolean()
    @ApiProperty({ description: ''})
    applied!: boolean;
}