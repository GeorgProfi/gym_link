import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerContextMiddleware } from './shared/middlewares/logger-context.middleware';

@Global()
@Module({
    providers: [],
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerContextMiddleware).forRoutes('*');
    }
}
