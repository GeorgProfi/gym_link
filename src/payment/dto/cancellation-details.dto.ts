import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsBoolean, IsDefined, IsJSON, IsString, IsUrl, ValidateNested } from 'class-validator';
  
export class CancellationDetailsDto {
    @IsString()
    @ApiProperty({ description: ''})
    party!: string;
  
    @IsString()
    @ApiProperty()
    reason!: string;
}