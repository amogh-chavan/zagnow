import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1711517287083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "vendors" (
        id bigserial NOT NULL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        restaurant_id bigint NULL, 
        roles jsonb NOT NULL,
        is_deleted boolean NOT NULL DEFAULT false, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS "customers" (
        id bigserial NOT NULL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        is_deleted boolean NOT NULL DEFAULT false, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS "admins" (
        id bigserial NOT NULL PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        roles jsonb NOT NULL DEFAULT '["admin"]'::jsonb,
        is_deleted boolean NOT NULL DEFAULT false, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO admins(name,email,password,roles) values('superadmin','superadmin@gmail.com','$2b$10$cU4Ljg5qV2NJHgLxA7/O9uMcVXDjRRtXzkITuG3Uekue1S7kQYUhG','["superadmin"]');
      
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
         DROP TABLE IF EXISTS "vendors";
         DROP TABLE IF EXISTS "customers";
         DROP TABLE IF EXISTS "admins";
    `);
  }
}
