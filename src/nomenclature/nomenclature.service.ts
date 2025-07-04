import { Injectable } from '@nestjs/common';

import { User } from '../entity/user.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalCategory } from '../entity/external-category.entity';
import { InternalCategory } from '../entity/internal-category.entity';
import { ExternalAtInternalCategory } from '../entity/external-at-internal-category.entity';
import { ReqCreateNomenclatureDto} from './dto/req-create-nomenclature.dto';

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
export class NomenclatureService {
    constructor(
        @InjectRepository(User)
        private userRep: Repository<User>,
        @InjectRepository(ExternalCategory)
        private externalCategoryRep: Repository<ExternalCategory>,
        @InjectRepository(InternalCategory)
        private internalCategoryRep: Repository<InternalCategory>,
        @InjectRepository(ExternalAtInternalCategory)
        private externalAtInternalCategoryRep: Repository<ExternalAtInternalCategory>,
    ) {}

    async CreateNomenclature(body: ReqCreateNomenclatureDto, userID: string) {
        return this.userRep.save({ ...body, id: userID });
    }
    async DeleteUser(userID: string) {
        await this.userRep.softDelete({ id: userID });
        return { id: userID };
    }
}
