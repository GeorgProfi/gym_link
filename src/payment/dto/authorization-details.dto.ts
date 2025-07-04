import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';
import { threeDSecureDto } from "./three-d-secure.dto";

export class AuthorizationDetailsDto {
    @IsString()
    @ApiProperty({ description: ''})
    rrn?: string;
  
    @IsString()
    @ApiProperty({ description: ''})
    auth_code?: string;

    @ApiProperty({ description: ''})
    @ValidateNested()
    three_d_secure!: threeDSecureDto;
}