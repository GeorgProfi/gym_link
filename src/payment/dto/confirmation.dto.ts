import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';
  
export class ConfirmationDto {
    @IsString()
    @ApiProperty({ description: ''})
    type!: string;
  
    @IsUrl()
    @ApiProperty()
    return_url?: string;

    @IsString()
    confirmation_token?: string;

    @IsString()
    @ApiProperty()
    locale?: string;
}