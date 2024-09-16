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
import { Organization } from './organization.entity';
import { State } from './state.entity';

@Entity()
export class Flowchart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('json')
  definitionASL: any;

  @Column({ nullable: true })
  stepFunctionArn?: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.flowcharts)
  organization: Organization;

  @OneToMany(() => State, (state) => state.flowchart)
  states: State[];
}
