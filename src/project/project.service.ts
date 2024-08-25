import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/shared/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
