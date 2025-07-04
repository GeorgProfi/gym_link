import { Injectable, Logger } from '@nestjs/common';

import { User } from '../entity/user.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalCategory } from '../entity/external-category.entity';
import { ResListDto } from '../shared/dto/res-dto/res-list.dto';
import { ClientException } from '../shared/exceptions/client.exception';
import { EErrorCode } from '../shared/enums/error-code.enum';
import { InternalCategory } from '../entity/internal-category.entity';
import { ReqSaveIntegrationSettingsDto } from './dto/req-save-integration-settings.dto';
import { ExternalAtInternalCategory } from '../entity/external-at-internal-category.entity';
import { ResListSaveIntegrationDto } from '../shared/dto/res-dto/req-list-save-integration.dto';
import * as fs from 'fs';

export interface AuthenticationPayload {
    user: User;
    payload: {
        type: string;
        token: string;
        refresh_token?: string;
    };
}
export interface RefreshTokenPayload {
    jti: number;
    sub: string;
}

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(User)
        private userRep: Repository<User>,
        @InjectRepository(ExternalCategory)
        private externalCategoryRep: Repository<ExternalCategory>,
        @InjectRepository(InternalCategory)
        private internalCategoryRep: Repository<InternalCategory>,
        @InjectRepository(ExternalAtInternalCategory)
        private externalAtInternalCategoryRep: Repository<ExternalAtInternalCategory>,
        //private mailService: MailService,
    ) {}

    async UpdateExternalCategory(CMS: string, apiKey: string, userID: string) {
        //запрос на полуение категорий с МоегоСклада
        const f = await fetch('https://api.moysklad.ru/api/remap/1.2/entity/productfolder', {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${apiKey}`,
            },
        });

        const categories = await f.json();
        const supplier = await this.userRep.findOneBy({ id: userID });
        if (!supplier) {
            throw new ClientException(EErrorCode.NotFoundEntity, 'Пользователь не найден');
        }
        Logger.verbose(categories, 'категории продавца');
        const categories_array = [];
        // структуризация внешних категорий
        categories['rows'].map((category) => {
            categories_array.push({
                name: category['name'],
                ExternalId: category['id'],
                Supplier: supplier,
            } as ExternalCategory);

            this.get_products(category['meta']['href'], apiKey);
        });
        // сейвим внешние категории
        try {
            await this.externalCategoryRep.save(categories_array);
        } catch (e) {
            Logger.verbose(e);
        }
        //products_array.push(await this.get_products(category['meta']['href'], apiKey));
        //получение всех категорий продавца
        const SuppliersCategory = await this.externalCategoryRep.find({
            where: { Supplier: supplier },
        });

        return { rows: SuppliersCategory };
    }
    async getInternalCategory() {
        const category = await this.internalCategoryRep.find();
        if (!category) {
            throw new ClientException(EErrorCode.NotFoundEntity, 'Пользователь не найден');
        }
        return { rows: category };
    }

    async saveIntegrationSettings(
        relationOfСategories: ResListSaveIntegrationDto<ReqSaveIntegrationSettingsDto>,
    ) {
        const dataForSaving = [];
        relationOfСategories.rows.map((relation) => {
            relation.externalCategoryId.map((exCat) =>
                dataForSaving.push({
                    internalCategoryId: relation.internalCategoryId,
                    externalCategoryId: exCat,
                }),
            );
        });
        this.externalAtInternalCategoryRep.save(dataForSaving);

        const category = await this.internalCategoryRep.find();
        if (!category) {
            throw new ClientException(EErrorCode.NotFoundEntity, 'Пользователь не найден');
        }
        return { rows: [] };
    }
    async get_products(folder, apiKey) {
        const f = await fetch('https://api.moysklad.ru/api/remap/1.2/entity/product', {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const products = await f.json();

        const products_array = [];
        //console.log();
        for (const product of await products['rows']) {
            if (product['productFolder']['meta']['href'] == folder) {
                //console.log(product);
                products_array.push({
                    name: product['name'],
                    id: product['id'],
                });
                await this.download_image(product.images.meta.href, apiKey);
            }
        }
        //console.log(products_array);
        return products_array;
    }
    async download_image(url, apiKey) {
        const f = await fetch(url, {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'image/png',
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const images = await f.json();

        for (const img of images.rows) {
            const fetch = require('node-fetch');
            const f = await fetch(img.meta.downloadHref, {
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'image/png',
                    Authorization: `Bearer ${apiKey}`,
                },
            });
            console.log();
            const imgdata = await f.buffer();
            console.log(imgdata);
            fs.writeFile(`static/${img.filename}`, imgdata, 'binary', function (err) {
                if (err) throw err;
                console.log('File saved.');
            });
            //     const request = http.get(options, function (res) {
            //         let imagedata = '';
            //         res.setEncoding('binary');
            //         res.on('data', function (chunk) {
            //             imagedata += chunk;
            //         });
            //
            //         res.on('end', function () {
            //
            //             });
            //         });
            //     });
            //
            //
            //
            //
        }
    }
}
