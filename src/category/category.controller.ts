import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReqGetExternalCategoryDto } from './dto/req-get-external-category.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../shared/roles.guard';
import { ERole } from '../shared/enums/role.enum';
import { Roles } from '../shared/role.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ExternalCategory } from '../entity/external-category.entity';
import { ResListDto } from '../shared/dto/res-dto/res-list.dto';
import { InternalCategory } from '../entity/internal-category.entity';
import { ReqSaveIntegrationSettingsDto } from './dto/req-save-integration-settings.dto';
import { ResListSaveIntegrationDto } from '../shared/dto/res-dto/req-list-save-integration.dto';

@ApiTags('category')
@Controller('/category')
@ApiBearerAuth('access')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @ApiOperation({
        description: 'загрузить Категории товаров продавца',
    })
    @UseGuards(JwtGuard)
    @Post('/update-external-categories')
    async GetExCategories(
        @Req() req: { user: { id: string } },
        @Body() GetExDto: ReqGetExternalCategoryDto,
    ): Promise<ResListDto<ExternalCategory>> {
        console.log('userId', req.user.id);
        return this.categoryService.UpdateExternalCategory(
            GetExDto.CMS,
            GetExDto.apiKey,
            req.user.id,
        );
    }
    @ApiOperation({
        description: 'Получить внутренние категории',
    })
    @UseGuards(JwtGuard)
    @Get('/get-internal-categories')
    async GetLocalCategory(
        @Req() req: { user: { id: string } },
    ): Promise<ResListDto<InternalCategory>> {
        console.log('userId', req.user.id);
        return this.categoryService.getInternalCategory();
    }
    @ApiOperation({
        description: 'загрузить Категории товаров продавца',
    })
    @UseGuards(JwtGuard)
    @Put('/save-integration-settings')
    async saveIntegrationSettings(
        @Req() req: { user: { id: string } },
        @Body() relationOfCategories: ResListSaveIntegrationDto<ReqSaveIntegrationSettingsDto>,
    ): Promise<ResListDto<ExternalCategory>> {
        console.log('userId', req.user.id);
        return this.categoryService.saveIntegrationSettings(relationOfCategories);
    }
}
