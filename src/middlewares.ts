import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ValidationError } from 'class-validator';
import { ValidateException } from './shared//exceptions/validate.exception';
import { LoggingInterceptor } from './shared//interceptors/logging.interceptor';

export function middlewares(app: INestApplication): INestApplication {
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory(validationErrors: ValidationError[]) {
                return new ValidateException(validationErrors);
            },
        }),
    );
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalFilters(new GlobalExceptionFilter());
    return app;
}
