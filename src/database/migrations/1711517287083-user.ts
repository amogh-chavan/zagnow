import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1711517287083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "vendor" (
        id bigserial NOT NULL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        restaurant_id bigint NOT NULL, 
        is_deleted boolean NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS "customer" (
        id bigserial NOT NULL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        is_deleted boolean NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS "admin" (
        id bigserial NOT NULL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        is_deleted boolean NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
         DROP TABLE IF EXISTS "vendor";
         DROP TABLE IF EXISTS "customer";
         DROP TABLE IF EXISTS "admin";
    `);
  }
}
