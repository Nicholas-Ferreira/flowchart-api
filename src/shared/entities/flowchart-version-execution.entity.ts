import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FlowchartVersion } from './flowchart-version.entity';

@Entity('flowchart_version_execution')
export class FlowchartVersionExecution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  ip: string;

  @Column('json')
  input: any;

  @Column('json')
  output: any;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => FlowchartVersion, (version) => version.executions)
  version: FlowchartVersion[];
}
