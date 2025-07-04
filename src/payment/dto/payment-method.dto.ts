import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { AmountDto } from "./amount.dto";
import { RecipientDto } from "./recipient.dto";


export class PaymentMethodDto {
    @IsString()
    @ApiProperty({ description: ''})
    type!: string;
  
    @IsString()
    @ApiProperty({ description: ''})
    id!: string;

    @IsString()
    @ApiProperty({ description: ''})
    saved!: string;

    // @ApiProperty({ description: ''})
    // @IsString()
    // title?: string;

    // @ApiProperty({ description: ''})
    // @ValidateNested()
    // discount_amount?: AmountDto;

    // @ApiProperty({ description: ''})
    // loan_option?: string;

    // @ApiProperty({ description: ''})
    // login?: string;
}

  