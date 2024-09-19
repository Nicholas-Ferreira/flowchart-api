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
import { Environment } from './environment.entity';
import { FlowchartVersion } from './flowchart-version.entity';
import { LambdaFunction } from './lambda-function.entity';
import { Organization } from './organization.entity';

@Entity()
export class Flowchart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('json')
  definition: any;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.flowcharts)
  organization: Organization;

  @ManyToOne(() => Environment, (environment) => environment.flowcharts)
  environment: Environment;

  @OneToMany(() => FlowchartVersion, (version) => version.flowchart)
  versions: FlowchartVersion[];

  @OneToMany(() => LambdaFunction, (lambda) => lambda.flowchart)
  lambdas: FlowchartVersion[];
}
