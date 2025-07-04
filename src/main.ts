import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './swagger';
import { WinstonModule } from 'nest-winston';
import { winstonModuleOptions } from '../logger';
import { middlewares } from './middlewares';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger(winstonModuleOptions),
    });

    app.use(
        session({
            secret: 'SECRET',
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    const options = new DocumentBuilder()
        .setTitle('GymLink')
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
            'access',
        )
        .build();
    app.setGlobalPrefix('/api');
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api-doc', app, document);

    middlewares(app);

    await app.listen(1234);
}
bootstrap();
