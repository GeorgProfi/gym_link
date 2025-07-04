import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';

export class AmountDto {
    @IsString()
    @ApiProperty({ description: ''})
    value!: string;
  
    @IsString()
    @ApiProperty({ description: ''})
    currency!: string;
}