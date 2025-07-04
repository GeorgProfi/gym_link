import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../entity/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

//import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as util from 'util';
import { Refresh } from '../entity/refresh.entity';

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
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRep: Repository<User>,
        @InjectRepository(Refresh)
        private RefreshRep: Repository<Refresh>,
        private readonly jwtService: JwtService,
        //private mailService: MailService,
    ) {}
    async createRefreshToken(user: User, ttl: number): Promise<Refresh> {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);

        const refresh = await this.RefreshRep.save({
            user: user.id,
            is_revoked: false,
            expires: expiration,
        });
        return refresh;
    }
    async generateAccessToken(user: User): Promise<string> {
        const opts: JwtSignOptions = {
            subject: user.id.toString(),
        };

        console.log('opts', util.inspect(opts, { depth: 10 }));

        console.log('sign', this.jwtService.signAsync({}, opts));

        return this.jwtService.signAsync({ role: user.role }, opts);
    }
    async generateRefreshToken(user: User): Promise<string> {
        const token = await this.createRefreshToken(user, 86400 * 30);
        const opts: JwtSignOptions = {
            expiresIn: 86400 * 30,
            subject: user.id.toString(),
            jwtid: token.id.toString(),
        };

        return this.jwtService.signAsync({}, opts);
    }
    private async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
        try {
            return this.jwtService.verifyAsync(token);
        } catch (e) {
            throw new UnprocessableEntityException('Refresh token expired');
        }
    }
    async resolveRefreshToken(encoded: string): Promise<{ user: User; token: Refresh }> {
        const payload = await this.decodeRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

        if (!token) {
            throw new UnprocessableEntityException('Refresh token not found');
        }

        if (token.is_revoked) {
            throw new UnprocessableEntityException('Refresh token revoked');
        }

        const user = await this.getUserFromRefreshTokenPayload(payload);

        if (!user) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return { user, token };
    }
    private async getUserFromRefreshTokenPayload(
        payload: RefreshTokenPayload,
    ): Promise<User | null> {
        const subId = payload.sub;

        if (!subId) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        const user = await this.userRep.findOneBy({ id: subId });

        if (user) {
            return user;
        }

        return null;
    }
    private async getStoredTokenFromRefreshTokenPayload(
        payload: RefreshTokenPayload,
    ): Promise<Refresh | null> {
        const tokenId = payload.jti;

        if (!tokenId) {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return this.RefreshRep.findOne({ where: { id: tokenId.toString() } });
    }

    async createAccessTokenFromRefreshToken(
        refresh: string,
    ): Promise<{ token: string; user: User }> {
        const { user } = await this.resolveRefreshToken(refresh);

        const token = await this.generateAccessToken(user);

        return { user, token };
    }
    async validateUser(
        email: string,
        pass: string,
    ): Promise<{ data: AuthenticationPayload } | null> {
        const user = await this.userRep.findOne({
            where: { email: email },
        });

        if (!user) {
            throw new UnauthorizedException(`Пользователь с email=${email} не найден`);
        }

        console.log('user', user);

        const checkPass = await bcrypt.compare(pass, user.password);

        console.log('checkPass', checkPass);

        if (user && checkPass) {
            const token = await this.generateAccessToken(user);
            const refresh = await this.generateRefreshToken(user);

            const payload = this.buildResponsePayload(user, token, refresh);

            return {
                data: payload,
            };
        }
        return null;
    }

    async getRefreshToken(refreshRequest: RefreshTokenDto) {
        const { user, token } = await this.createAccessTokenFromRefreshToken(
            refreshRequest.refreshToken,
        );

        const payload = this.buildResponsePayload(user, token);

        return {
            data: payload,
        };
    }

    async register(registerDto: RegisterDto) {
        const user = await this.userRep.findOne({ where: { email: registerDto.email } });
        if (user) {
            throw new NotFoundException('Пользователь с таким email уже существует');
        }
        console.log('user', user);
        console.log('jwt', process.env.JWT_SECRET);
        const newUser = await this.userRep.save({
            email: registerDto.email,
            password: await bcrypt.hash(registerDto.password, 10),
        });
        console.log('newUser', newUser);
        const token = await this.generateAccessToken(newUser);
        console.log('token', token);
        const refresh = await this.generateRefreshToken(newUser);
        console.log('refresh', refresh);
        const payload = this.buildResponsePayload(newUser, token, refresh);
        console.log('payload', payload);
        // await this.mailService.sendUserConfirmation(newUser, token);

        return {
            data: payload,
        };
    }

    private buildResponsePayload(
        user: User,
        accessToken: string,
        refreshToken?: string,
    ): AuthenticationPayload {
        return {
            user: user,
            payload: {
                type: 'bearer',
                token: accessToken,
                ...(refreshToken ? { refresh_token: refreshToken } : {}),
            },
        };
    }

    async validateUserJwt(id: string): Promise<any> {
        const user = await this.userRep.findOneBy({ id: id });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        if (user) {
            return {
                id: user.id.toString(),
                email: user.email,
                role: user.role,
            };
        }

        return null;
    }

    // async recoveryPassword(email: string) {
    //   await this.mailService.sendRecoveryPassword(email);
    // }

    async changePassword(registerDto: RegisterDto) {
        try {
            const user = await this.userRep.findOneBy({ email: registerDto.email });

            const newUser = await this.userRep.save({
                email: registerDto.email,
                password: await bcrypt.hash(registerDto.password, 10),
            });

            if (newUser) {
                const token = await this.generateAccessToken(newUser);
                const refresh = await this.generateRefreshToken(newUser);

                const payload = this.buildResponsePayload(newUser, token, refresh);

                return {
                    data: payload,
                };
            } else {
                throw new NotFoundException('user not found');
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
