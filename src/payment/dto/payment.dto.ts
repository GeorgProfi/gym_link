import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDate, IsDefined, IsJSON, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { AmountDto } from "./amount.dto";
import { RecipientDto } from "./recipient.dto";
import { PaymentMethodDto } from "./payment-method.dto";
import { ConfirmationDto } from "./confirmation.dto";
import { CancellationDetailsDto } from "./cancellation-details.dto";
import { AuthorizationDetailsDto } from "./authorization-details.dto";


export class PaymentDto {

    @IsString()
    @ApiProperty({ description: ''})
    id!: string;
  
    @IsString()
    @ApiProperty({ description: ''})
    status!: string;

    @ValidateNested()
    @ApiProperty({ description: ''})
    amount!: AmountDto;

    @ApiProperty({ description: ''})
    @ValidateNested()
    income_amount?: AmountDto;

    @IsString()
    @ApiProperty({ description: ''})
    description!: string;

    @ApiProperty({ description: ''})
    @ValidateNested()
    recipient!: RecipientDto;
    
    @ApiProperty({ description: ''})
    @ValidateNested()
    payment_method?: PaymentMethodDto;

    @ApiProperty({ description: ''})
    @IsDate()
    captured_at?: string;

    @ApiProperty({ description: ''})
    @IsDate()
    created_at!: string;

    @ApiProperty({ description: ''})
    @IsDate()
    expires_at?: string;

    @ApiProperty({ description: ''})
    @ValidateNested()
    confirmation?: ConfirmationDto;

    @ApiProperty({ description: ''})
    @IsBoolean()
    test!: boolean;

    @ApiProperty({ description: ''})
    @ValidateNested()
    refunded_amount?: AmountDto;

    @ApiProperty({ description: ''})
    @IsBoolean()
    paid!: boolean;
    
    @ApiProperty({ description: ''})
    @IsBoolean()
    refundable!: boolean;

    @ApiProperty({ description: ''})
    @IsString()
    receipt_registration?: string

    @ApiProperty({ description: ''})
    @IsObject()
    metadata?: Object

    @ApiProperty({ description: ''})
    @ValidateNested()
    cancellation_details?: CancellationDetailsDto;

    @ApiProperty({ description: ''})
    @ValidateNested()
    authorization_details?: AuthorizationDetailsDto;
}