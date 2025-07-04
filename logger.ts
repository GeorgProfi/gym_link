import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';

import { utilities } from 'nest-winston';

export const winstonModuleOptions: WinstonModuleOptions = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                winston.format.ms(),
                utilities.format.nestLike('GymLinkBack', {
                    prettyPrint: true,
                    colors: true,
                }),
            ),
            level: 'debug',
        }),

        new winston.transports.File({
            dirname: 'logs',
            filename: 'GymLinkBack.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.logstash()),
            level: 'debug',
        }),
    ],
};
