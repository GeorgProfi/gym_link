import { ApiProperty } from '@nestjs/swagger';

export class ResListDto<T> {
    @ApiProperty()
    rows!: T[];
}

export class ResObjectDto<T> {
    @ApiProperty()
    rows!: T;
}
