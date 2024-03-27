import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from 'src/shared/utils/datasource';

@Module({
  imports: [TypeOrmModule.forRoot(connectionSource.options)],
})
export class DatabaseModule {}
