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
import { FlowchartVersionExecution } from './flowchart-version-execution.entity';
import { FlowchartVersionState } from './flowchart-version-state.entity';
import { Flowchart } from './flowchart.entity';

@Entity('flowchart_version')
export class FlowchartVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column('json')
  definition: any;

  @Column({ length: 255 })
  arn: string;

  @Column('text')
  endpoint: string;

  @Column({ length: 36 })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => FlowchartVersionState, (state) => state.version)
  states: FlowchartVersionState[];

  @ManyToOne(() => Flowchart, (flowchart) => flowchart.versions)
  flowchart: Flowchart;

  @OneToMany(() => FlowchartVersionExecution, (execution) => execution.version)
  executions: FlowchartVersionExecution[];
}
