import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { inspect } from 'util';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
    private readonly logger: Logger = new Logger(LoggerContextMiddleware.name);
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`${req.method} ${req.originalUrl}`);
        this.logger.log('params: ' + inspect(req.params, { colors: true }));
        this.logger.log('body: ' + inspect(req.body, { colors: true }));
        this.logger.log('query: ' + inspect(req.query, { colors: true }));
        next();
    }
}
