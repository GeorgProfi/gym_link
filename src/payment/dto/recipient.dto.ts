import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';


export class RecipientDto {
    @IsString()
    @ApiProperty({ description: ''})
    account_id!: string;
  
    @IsString()
    @ApiProperty({ description: ''})
    gateway_id!: string;    
}

  