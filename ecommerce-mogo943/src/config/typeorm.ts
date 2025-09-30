import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

dotenvConfig({ path: './.development.env'})

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config) //registrar servicio para NestJS

export const connectionSource = new DataSource(config as DataSourceOptions) //solo para migraciones