import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlowchartVersionState } from './flowchart-version-state.entity';
import { Flowchart } from './flowchart.entity';

@Entity()
export class LambdaFunction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  arn: string;

  @Column({ type: 'enum', enum: ['NodeJS', 'Python', 'Java'] })
  language: string;

  @Column('text')
  sourceCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => FlowchartVersionState, (state) => state.lambda)
  state: FlowchartVersionState;

  @OneToOne(() => Flowchart, (flowchart) => flowchart.lambdas)
  flowchart: Flowchart;
}
