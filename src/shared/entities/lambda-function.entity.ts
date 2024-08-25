import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { State } from './state.entity';

@Entity()
export class LambdaFunction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  sourceCode: string;

  @ManyToOne(() => Project, (project) => project.lambdas)
  project: Project;

  @OneToOne(() => State, (state) => state.lambda)
  state: State;
}
