import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/shared/entities/organization.entity';
import { Project } from 'src/shared/entities/project.entity';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createProject(
    user: User,
    organizationId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
    });
    if (!organization) throw new NotFoundException('Organization not found');

    const project = this.projectRepository.create({
      ...createProjectDto,
      createdBy: user.id,
      organization,
    });

    return this.projectRepository.save(project);
  }

  async findAllProjects(user: User, organizationId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { organization: { id: organizationId } },
    });
  }

  async findOneProject(user: User, organizationId: string, projectId: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, organization: { id: organizationId } },
    });
    if (!project) throw new NotFoundException('Project not found');

    return project;
  }

  // Atualizar um projeto existente
  async updateProject(
    user: User,
    organizationId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOneProject(user, organizationId, projectId);

    Object.assign(project, updateProjectDto);

    return this.projectRepository.save(project);
  }

  // Deletar um projeto existente
  async deleteProject(user: User, organizationId: string, projectId: string): Promise<void> {
    const project = await this.findOneProject(user, organizationId, projectId);

    await this.projectRepository.remove(project);
  }
}
