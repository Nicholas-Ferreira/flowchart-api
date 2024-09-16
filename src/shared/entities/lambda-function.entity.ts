import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.entity';

@Entity()
export class LambdaFunction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  sourceCode: string;

  @OneToOne(() => State, (state) => state.lambda)
  state: State;
}
