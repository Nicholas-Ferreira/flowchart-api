import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Flowchart } from './flowchart.entity';
import { LambdaFunction } from './lambda-function.entity';
import { Organization } from './organization.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  organization: Organization;

  @OneToMany(() => Flowchart, (flowchart) => flowchart.project)
  flowcharts: Flowchart[];

  @OneToMany(() => LambdaFunction, (lambda) => lambda.project)
  lambdas: LambdaFunction[];
}
