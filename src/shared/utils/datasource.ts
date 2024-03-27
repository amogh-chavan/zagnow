import { DataSource } from 'typeorm';
import { join } from 'path';
import { envConfigService } from 'src/config/env.config';
/**
 * Defines the configuration for the TypeORM data source.
 *
 * - `type`: Specifies the database type, here it's PostgreSQL.
 * - `host`: Database host address.
 * - `port`: Port number on which the database server is running.
 * - `username`: Username for database access.
 * - `password`: Password for database access.
 * - `database`: Name of the database to connect to.
 * - `logging`: Enables logging of TypeORM operations.
 * - `entities`: Specifies the location of entity files for TypeORM.
 * - `migrations`: Specifies the path for database migration files.
 * - `synchronize`: Controls automatic synchronization (creation/update) of database schema. Set to false for production.
 * - `migrationsTableName`: Name of the table to track migrations.
 * - `migrationsRun`: Controls if migrations should automatically be run on application start.
 */
export const connectionSource = new DataSource({
  type: 'postgres',
  host: envConfigService.getOrThrow('DB_HOST'),
  port: envConfigService.getOrThrow<number>('DB_PORT'),
  username: envConfigService.getOrThrow('DB_USER'),
  password: envConfigService.getOrThrow('DB_PASSWORD'),
  database: envConfigService.getOrThrow('DB_NAME'),
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrationsRun: envConfigService.getOrThrow('DB_RUN_MIGRATIONS'),
});
