import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FlowchartVersion } from './flowchart-version.entity';
import { LambdaFunction } from './lambda-function.entity';

@Entity('flowchart_version_state')
export class FlowchartVersionState {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column() // { type: 'enum', enum: ['Task', 'Choice', 'Parallel', 'Wait', 'Succeed', 'Fail', 'Pass'] }
  type: string;

  @Column('json')
  definition: any;

  @ManyToOne(() => FlowchartVersion, (version) => version.states)
  version: FlowchartVersion;

  @OneToOne(() => LambdaFunction, { nullable: true })
  @JoinColumn()
  lambda: LambdaFunction;
}
