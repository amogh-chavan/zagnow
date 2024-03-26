import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',

          host: configService.getOrThrow('POSTGRES_HOST'),
          port: configService.getOrThrow<number>('POSTGRES_PORT'),
          username: configService.getOrThrow('POSTGRES_USER'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          database: configService.getOrThrow('POSTGRES_DATABASE'),

          entities: ['**/*.entity{.ts,.js}'],

          migrationsTableName: 'migration',

          migrations: ['src/data/migration/*.ts'],

          //   cli: {
          //     migrationsDir: 'src/migration',
          //   },

          ssl: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
