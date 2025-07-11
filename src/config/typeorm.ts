import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import {join} from 'path'
import {User} from "../entity/user.entity";

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: [join(__dirname, '..', '/entity/*{.ts,.js}')],
  migrations: [join(__dirname,'..', 'migrations', '*{.ts,.js}')],
  //autoLoadEntities: true,
  synchronize: true,
}

console.log(config.entities)
console.log(config.migrations)
export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);