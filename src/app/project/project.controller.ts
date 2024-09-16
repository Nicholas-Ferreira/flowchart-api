import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/entities/user.entity';
import { IsMemberGuard } from 'src/shared/guards/is-member.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard(), IsMemberGuard)
@Controller('organization/:organizationId/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Param('organizationId') organizationId: string,
    @GetUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.createProject(user, organizationId, createProjectDto);
  }

  @Get()
  async findAllProjects(@Param('organizationId') organizationId: string, @GetUser() user: User) {
    return this.projectService.findAllProjects(user, organizationId);
  }

  @Get(':projectId')
  async findOneProject(
    @Param('organizationId') organizationId: string,
    @Param('projectId') projectId: string,
    @GetUser() user: User,
  ) {
    return this.projectService.findOneProject(user, organizationId, projectId);
  }

  @Patch(':projectId')
  async updateProject(
    @Param('organizationId') organizationId: string,
    @Param('projectId') projectId: string,
    @GetUser() user: User,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(user, organizationId, projectId, updateProjectDto);
  }

  @Delete(':projectId')
  async deleteProject(
    @Param('organizationId') organizationId: string,
    @Param('projectId') projectId: string,
    @GetUser() user: User,
  ) {
    return this.projectService.deleteProject(user, organizationId, projectId);
  }
}
