import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flowchart } from 'src/shared/entities/flowchart.entity';
import { Project } from 'src/shared/entities/project.entity';
import { State } from 'src/shared/entities/state.entity';
import { FlowchartController } from './flowchart.controller';
import { FlowchartService } from './flowchart.service';
import { DeployLambdaService } from './use-cases/deploy-lambda.service';
import { DeployStepFunctionService } from './use-cases/deploy-step-function.service';
import { ExecuteFlowchartService } from './use-cases/execute-flowchart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flowchart, Project, State])],
  controllers: [FlowchartController],
  providers: [
    FlowchartService,
    DeployLambdaService,
    DeployStepFunctionService,
    ExecuteFlowchartService,
  ],
})
export class FlowchartModule {}
