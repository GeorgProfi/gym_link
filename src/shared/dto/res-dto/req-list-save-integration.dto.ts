import { ApiProperty } from '@nestjs/swagger';

export class ResListSaveIntegrationDto<T> {
    @ApiProperty({
        default: '7d48b9b1-cdbb-41d9-a600-6d5e04044e2f',
        example:
            '[{"internalCategoryId":"45f5b6ad-0894-458d-94f2-83cdda4c580c","externalCategoryId":["39b0f197-0d62-49b1-94fb-114c98efbe56","a62ac6d6-baec-4ce9-a655-89da547bb060"]},{"internalCategoryId":"7d48b9b1-cdbb-41d9-a600-6d5e04044e2f","externalCategoryId":["fdc4f41f-86e8-459b-a8dc-961508383fdc","6da9fcf0-a58b-43c3-a2cd-a313952fcea6"]}]',
    })
    rows!: T[];
}

export class ResObjectDto<T> {
    @ApiProperty()
    rows!: T;
}
