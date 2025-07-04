import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
//import { Request } from 'express';
//import { RefreshTokenDto } from './dto/refresh-token.dto';
//import { PasswordRecoveryDto } from '../user/dto/password-recovery.dto';
import * as util from 'util';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        description: 'Аутентификация',
    })
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        console.log('login', util.inspect(loginDto, { depth: 5 }));
        return this.authService.validateUser(loginDto.email, loginDto.password);
    }

    @ApiOperation({
        description: 'Регистрация',
    })
    @Post('/register')
    async register(@Body() registerDto: RegisterDto) {
        console.log('register', registerDto);
        return this.authService.register(registerDto);
    }

    // @ApiOperation({
    //   description: 'Выход',
    // })
    // @Post('/logout')
    // async logout(@Req() req: Request) {
    //   req.logout((err) => {
    //     if (err) {
    //       return err;
    //     }
    //   });
    // }

    // @ApiOperation({
    //   description: 'Получить новый токен',
    // })
    // @Post('/refreshtoken')
    // async getRefreshToken(@Body() refreshRequest: RefreshTokenDto) {
    //   return this.authService.getRefreshToken(refreshRequest);
    // }

    // @ApiOperation({
    //   description: 'Отправка письма на почту для восстановления пароля',
    // })
    // @Post('password-recovery')
    // recoveryPassword(@Body() passwordRecoveryDto: PasswordRecoveryDto) {
    //   console.log('email', passwordRecoveryDto);
    //   return this.authService.recoveryPassword(passwordRecoveryDto.email);
    // }

    // @ApiOperation({
    //   description: 'Изменение пароля',
    // })
    // @Post('change-password')
    // async changePassword(@Body() registerDto: RegisterDto) {
    //   console.log('changePassword', registerDto);
    //   return this.authService.changePassword(registerDto);
    // }
}
