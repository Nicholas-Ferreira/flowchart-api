import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sensitive } from '../decorators/sensitive.decorator';
import { Organization } from './organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Sensitive()
  @Column({ unique: true, nullable: true })
  idpId: string;

  @Column({ length: 100 })
  name: string;

  @Sensitive()
  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Organization, (organization) => organization.ownerUser)
  ownerOrganizations: Organization[];

  @ManyToMany(() => Organization, (organization) => organization.members)
  organizations: Organization[];
}
