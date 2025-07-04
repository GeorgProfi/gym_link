import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { ArrayNotEmpty, IsArray,
     IsBoolean, IsDate, IsDefined, IsJSON, 
     IsString, IsUrl, ValidateNested } from 'class-validator';
import { Product } from "src/entity/product.entity";
import { ProductDto } from "./product.dto";

export class OrderDto {
    @IsString()
    @ApiProperty({ description: ''})
    token!: string;

    @IsDate()
    @ApiProperty({ description: ''})
    date!: Date;

    @IsString()
    @ApiProperty({ description: ''})
    client_id!: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @ApiProperty({ description: ''})
    products!: ProductDto[];
}

  