import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { VendorRoles } from '../enum';

@Entity('vendors') // Name of the database table
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string; // Consider using a separate entity/service for password hashing

  @Column({ type: 'jsonb', nullable: false })
  roles: VendorRoles[];

  @Column({ type: 'numeric', nullable: true })
  restaurant_id: number;

  @Column({ nullable: false, default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
