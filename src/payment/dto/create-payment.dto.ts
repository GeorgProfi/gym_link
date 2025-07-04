import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ConfirmationDto } from "./confirmation.dto";
import { AmountDto } from "./amount.dto";
  

export class CreatePaymentDto {
    @ValidateNested()
    @ApiProperty({ description: ''})
    amount!: AmountDto;

    @IsBoolean()
    @ApiProperty({ description: ''})
    capture!: boolean;

    @ValidateNested()
    @ApiProperty({ description: ''})
    confirmation!: ConfirmationDto;

    @IsString()
    @ApiProperty({ description: ''})
    description!: string;
  }

  