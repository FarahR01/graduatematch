import { Column, Entity, OneToOne, Index, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../common/entities/base.entity';
import { Graduate } from '../../graduate/domain/graduate.entity';
import { Company } from '../../company/domain/company.entity';
import { Application } from '../../application/domain/application.entity';

export enum UserRole {
  GRADUATE = 'graduate',
  COMPANY = 'company',
  ADMIN = 'admin',
}

/**
 * User Entity - Represents authentication and base user information
 * This entity is inherited by Graduate and Company profiles
 * Maintains separation of concerns: authentication vs profile-specific data
 */
@Entity('users')
@Index(['email'])
@Index(['role'])
export class User extends AppBaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'text' })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GRADUATE,
  })
  role!: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  // Relations
  @OneToOne(() => Graduate, (graduate) => graduate.user, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  graduate?: Graduate;

  @OneToOne(() => Company, (company) => company.user, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  company?: Company;

  @OneToMany(() => Application, (app) => app.graduate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  applications?: Application[];
}
