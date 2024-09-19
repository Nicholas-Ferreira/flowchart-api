import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowchartVersion } from 'src/shared/entities/flowchart-version.entity';
import { Flowchart } from 'src/shared/entities/flowchart.entity';
import { Organization } from 'src/shared/entities/organization.entity';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_DEFINITION_ASL } from './constants/flowchart.constants';
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
    @InjectRepository(FlowchartVersion)
    private readonly flowchartVersionRepository: Repository<FlowchartVersion>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly deployLambdaService: DeployLambdaService,
    private readonly deployStepFunctionService: DeployStepFunctionService,
    private readonly executeFlowchartService: ExecuteFlowchartService,
  ) {}

  async create(
    user: User,
    organizationId: string,
    createFlowchartDto: CreateFlowchartDto,
  ): Promise<Flowchart> {
    const flowchart = this.flowchartRepository.create({
      ...createFlowchartDto,
      definition: DEFAULT_DEFINITION_ASL,
      createdBy: user.id,
      organization: <Partial<Organization>>{ id: organizationId },
    });

    return this.flowchartRepository.save(flowchart);
  }

  async findAll(organizationId: string): Promise<Flowchart[]> {
    return this.flowchartRepository.find({
      where: { organization: { id: organizationId } },
      relations: ['organization', 'states'],
    });
  }

  async findOne(flowchartId: string): Promise<Flowchart> {
    const flowchart = await this.flowchartRepository.findOne({
      where: { id: flowchartId },
      relations: ['organization', 'states'],
    });
    if (!flowchart) throw new NotFoundException('Flowchart not found');
    return flowchart;
  }

  async update(flowchartId: string, updateFlowchartDto: UpdateFlowchartDto): Promise<Flowchart> {
    const flowchart = await this.findOne(flowchartId);
    Object.assign(flowchart, updateFlowchartDto);

    return this.flowchartRepository.save(flowchart);
  }

  async remove(user: User, flowchartId: string): Promise<void> {
    const flowchart = await this.findOne(flowchartId);
    await this.flowchartRepository.remove(flowchart);
  }

  async deploy(flowchartVersionId: string): Promise<any> {
    const version = await this.flowchartVersionRepository.findOneBy({ id: flowchartVersionId });
    if (!version) throw new NotFoundException('Version not found');

    await this.deployLambdaService.execute(version);

    version.arn = await this.deployStepFunctionService.execute(version);

    await this.flowchartRepository.save(version);

    return version;
  }

  async execute(flowchartVersionId: string, input: any): Promise<any> {
    const flowchart = await this.flowchartVersionRepository.findOneBy({ id: flowchartVersionId });
    if (!flowchart.arn)
      throw new NotFoundException('Step Function not deployed for this flowchart');

    return this.executeFlowchartService.execute(flowchart, input);
  }
}
