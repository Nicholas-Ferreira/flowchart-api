import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExecutionHistory } from './execution-history.entity';
import { Organization } from './organization.entity';
import { State } from './state.entity';

@Entity()
export class Flowchart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('json')
  definitionASL: any;

  @Column({ nullable: true })
  stepFunctionArn?: string;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  organization: Organization;

  @OneToMany(() => State, (state) => state.flowchart)
  states: State[];

  @OneToMany(() => ExecutionHistory, (executionHistory) => executionHistory.flowchart)
  executionHistories: ExecutionHistory[];
}
