import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { AdminRoles } from '../enum';

@Entity('admins') // Name of the database table
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string; // Consider using a separate entity/service for password hashing

  @Column({ type: 'jsonb', nullable: false })
  roles: AdminRoles[];

  @Column({ nullable: false, default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
