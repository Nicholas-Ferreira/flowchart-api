import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flowchart } from './flowchart.entity';
import { LambdaFunction } from './lambda-function.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column() // { type: 'enum', enum: ['Task', 'Choice', 'Parallel', 'Wait', 'Succeed', 'Fail', 'Pass'] }
  type: string;

  @Column('json')
  definition: any;

  @ManyToOne(() => Flowchart, (flowchart) => flowchart.states)
  flowchart: Flowchart;

  @OneToOne(() => LambdaFunction, { nullable: true })
  @JoinColumn()
  lambda: LambdaFunction;
}
