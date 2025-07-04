import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';
import { PaymentDto } from "./payment.dto";

export class NotificationDto {
    @IsString()
    @ApiProperty({ description: ''})
    type!: string;
  
    @IsString()
    @ApiProperty({ description: ''})
    event!: string;

    @ValidateNested()
    @ApiProperty({ description: ''})
    object!: PaymentDto;
}

  