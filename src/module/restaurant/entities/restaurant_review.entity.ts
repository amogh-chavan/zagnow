import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('restaurant_reviews')
export class RestaurantReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false, length: 255 })
  user_type: string;

  @Column({ nullable: true })
  restaurant_id?: number;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: true, length: 255 })
  comment?: string;

  @Column({ nullable: false, default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
