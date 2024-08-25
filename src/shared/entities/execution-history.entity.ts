import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flowchart } from './flowchart.entity';

@Entity()
export class ExecutionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  executionDate: Date;

  @Column() // { type: 'enum', enum: ['Success', 'Failed'] }
  result: string;

  @Column('text')
  logs: string;

  @ManyToOne(() => Flowchart, (flowchart) => flowchart.executionHistories)
  flowchart: Flowchart;
}
