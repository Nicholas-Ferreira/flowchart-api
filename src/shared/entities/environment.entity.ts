import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnvironmentVariable } from './environment-variable.entity';
import { Flowchart } from './flowchart.entity';

@Entity('environment')
export class Environment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['DEV', 'PROD', 'TEST'] })
  tag: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Flowchart, (flowchart) => flowchart.environment)
  flowcharts: Flowchart[];

  @OneToMany(() => EnvironmentVariable, (variable) => variable.environment)
  variables: EnvironmentVariable[];
}
