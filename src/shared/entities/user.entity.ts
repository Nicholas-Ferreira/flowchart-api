import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
