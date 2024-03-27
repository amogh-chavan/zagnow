import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('restaurants') // Name of the database table
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @Column({ nullable: false })
  listing_name: string;

  @Column({ nullable: false })
  business_phone: string;

  @Column({ nullable: false })
  restaurant_address: string;

  @Column({ nullable: false, type: 'float4' })
  restaurant_latitude: number;

  @Column({ nullable: false, type: 'float4' })
  restaurant_longitude: number;

  @Column({ type: 'jsonb', nullable: true })
  restaurant_images: object;

  @Column({ type: 'jsonb', nullable: true })
  menu_images: object;

  @Column({ type: 'int', default: 0, nullable: false })
  rating: number;

  @Column({ nullable: false, default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
