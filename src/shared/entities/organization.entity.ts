import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Flowchart } from './flowchart.entity';
import { User } from './user.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.ownerOrganizations, { nullable: false })
  ownerUser: User;

  @OneToMany(() => Flowchart, (flowchart) => flowchart.organization)
  flowcharts: Flowchart[];

  @ManyToMany(() => User, (user) => user.organizations)
  @JoinTable({
    name: 'organization_members',
    joinColumn: {
      name: 'organization',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
  })
  members: User[];
}
