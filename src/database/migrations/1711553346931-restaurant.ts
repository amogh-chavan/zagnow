import { MigrationInterface, QueryRunner } from 'typeorm';

export class Restaurant1711553346931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "restaurants" (
            id bigserial NOT NULL PRIMARY KEY, 
            listing_name VARCHAR(255) NOT NULL, 
            business_phone VARCHAR(255) NOT NULL, 
            restaurant_address VARCHAR(255) NOT NULL, 
            restaurant_latitude float4 NOT NULL, 
            restaurant_longitude float4 NOT NULL, 
            restaurant_images jsonb NULL, 
            menu_images jsonb NULL, 
            is_deleted boolean NOT NULL DEFAULT false, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
      
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE IF EXISTS "restaurant";

`);
  }
}
