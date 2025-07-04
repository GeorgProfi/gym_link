import { Body, Controller, Delete, Post, Query, Req, UseGuards } from '@nestjs/common';
import { NomenclatureService } from './nomenclature.service';
import { ReqCreateNomenclatureDto } from './dto/req-create-nomenclature.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/role.decorator';
import { ERole } from '../shared/enums/role.enum';
import { ResUpdateNomenclatureDto } from './dto/res-update-user.dto';

@ApiTags('nomenclature')
@Controller('/nomenclature')
@ApiBearerAuth('access')
@UseGuards(JwtGuard, RolesGuard)
@Roles(ERole.admin)
export class NomenclatureController {
    constructor(private readonly nomenclotureService: NomenclatureService) {}

    @ApiOperation({
        description: 'Update user info',
    })
    // @UseGuards(JwtGuard)
    @Post('/create')
    async CreateNomenclature(
        @Req() req: { user: { id: string } },
        @Body() body: ReqCreateNomenclatureDto,
    ): Promise<ResUpdateNomenclatureDto> {
        console.log('userId', req.user.id);
        return this.nomenclotureService.CreateNomenclature(body, req.user.id);
    }
    // @ApiOperation({
    //     description: 'delete user',
    // })
    // @Roles(ERole.admin)
    // @Delete('/delete')
    // async DeleteUser(@Query('id') id: string): Promise<{ id: string }> {
    //     return this.userService.DeleteUser(id);
    // }
}
