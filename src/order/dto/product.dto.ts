import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { ArrayNotEmpty, IsArray,
     IsBoolean, IsDate, IsDefined, IsJSON, 
     IsNumber, 
     IsString, IsUrl, ValidateNested } from 'class-validator';

export class ProductDto {
    @IsString()
    @ApiProperty({ description: ''})
    id!: string;

    @IsNumber()
    @ApiProperty({ description: ''})
    count!: number;
}

  