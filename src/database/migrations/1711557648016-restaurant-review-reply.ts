import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestaurantReviewReply1711557648016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE restaurant_reviews (
        id bigserial NOT NULL PRIMARY KEY, 
        user_id bigint NOT NULL, 
        user_type varchar(255) NOT NULL, 
        restaurant_id bigint DEFAULT NULL, 
        rating int NOT NULL, 
        comment varchar(255), 
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
      );

      CREATE TABLE restaurant_review_replies (
        id bigserial NOT NULL PRIMARY KEY, 
        user_id bigint NOT NULL, 
        user_type varchar(255) NOT NULL, 
        restaurant_review_id INT NOT NULL, 
        comment TEXT, 
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (restaurant_review_id) REFERENCES restaurant_reviews(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "restaurant_reviews";
        DROP TABLE IF EXISTS "restaurant_review_replies";
     `);
  }
}
