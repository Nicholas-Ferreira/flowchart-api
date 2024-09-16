import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flowchart } from 'src/shared/entities/flowchart.entity';
import { Project } from 'src/shared/entities/project.entity';
import { State } from 'src/shared/entities/state.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateFlowchartDto } from './dto/create-flowchart.dto';
import { UpdateFlowchartDto } from './dto/update-flowchart.dto';
import { DeployLambdaService } from './use-cases/deploy-lambda.service';
import { DeployStepFunctionService } from './use-cases/deploy-step-function.service';
import { ExecuteFlowchartService } from './use-cases/execute-flowchart.service';

@Injectable()
export class FlowchartService {
  constructor(
    @InjectRepository(Flowchart)
    private readonly flowchartRepository: Repository<Flowchart>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly deployLambdaService: DeployLambdaService,
    private readonly deployStepFunctionService: DeployStepFunctionService,
    private readonly executeFlowchartService: ExecuteFlowchartService,
  ) {}

  async create(createFlowchartDto: CreateFlowchartDto): Promise<Flowchart> {
    const project = await this.projectRepository.findOneBy({ id: createFlowchartDto.projectId });
    if (!project) throw new NotFoundException('Project not found');

    const flowchart = this.flowchartRepository.create({
      ...createFlowchartDto,
      project,
    });
    return this.flowchartRepository.save(flowchart);
  }

  async findAll(projectId?: string): Promise<Flowchart[]> {
    const findOptions: FindOneOptions<Flowchart> = { where: {} };

    if (projectId) {
      const project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project) throw new NotFoundException('Project not found');
      findOptions.where = Object.assign(findOptions.where, { project: { id: project.id } });
    }

    findOptions.relations = ['project', 'states'];
    console.log({ findOptions });
    return this.flowchartRepository.find(findOptions);
  }

  async findOne(id: number): Promise<Flowchart> {
    return this.flowchartRepository.findOne({ where: { id }, relations: ['project', 'states'] });
  }

  async update(id: number, updateFlowchartDto: UpdateFlowchartDto): Promise<Flowchart> {
    await this.flowchartRepository.update(id, updateFlowchartDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.flowchartRepository.delete(id);
  }

  async deploy(flowchartId: number): Promise<any> {
    const flowchart = await this.findOne(flowchartId);
    if (!flowchart) throw new NotFoundException('Flowchart not found');

    await this.deployLambdaService.execute(flowchart);

    flowchart.stepFunctionArn = await this.deployStepFunctionService.execute(flowchart);

    await this.flowchartRepository.save(flowchart);

    return flowchart;
  }

  async execute(flowchartId: number, input: any): Promise<any> {
    const flowchart = await this.findOne(flowchartId);
    if (!flowchart) throw new NotFoundException('Flowchart not found');
    if (!flowchart.stepFunctionArn)
      throw new NotFoundException('Step Function not deployed for this flowchart');

    return this.executeFlowchartService.execute(flowchart, input);
  }
}
