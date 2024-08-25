import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flowchart } from './flowchart.entity';
import { LambdaFunction } from './lambda-function.entity';
import { User } from './user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Flowchart, (flowchart) => flowchart.project)
  flowcharts: Flowchart[];

  @OneToMany(() => LambdaFunction, (lambda) => lambda.project)
  lambdas: LambdaFunction[];
}
