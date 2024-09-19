import { Injectable } from '@nestjs/common';
import { stepFunctionsClient } from 'src/config/aws.config';
import { FlowchartVersion } from 'src/shared/entities/flowchart-version.entity';

@Injectable()
export class DeployStepFunctionService {
  async execute(flowchart: FlowchartVersion): Promise<string> {
    const stepFunctionParams = {
      name: `StepFunction_${flowchart.id}_${Date.now()}`,
      definition: JSON.stringify(flowchart.definition),
      roleArn: 'arn:aws:iam::123456789012:role/service-role/StepFunctionsExecutionRole', // Substitua pelo ARN da role apropriada
    };

    let stepFunctionArn: string;

    try {
      const existingStateMachine = await stepFunctionsClient.listStateMachines({}).promise();

      const existingMachine = existingStateMachine.stateMachines.find(
        (machine) => machine.name === stepFunctionParams.name,
      );

      if (existingMachine) {
        await stepFunctionsClient
          .updateStateMachine({
            stateMachineArn: existingMachine.stateMachineArn,
            definition: stepFunctionParams.definition,
            roleArn: stepFunctionParams.roleArn,
          })
          .promise();

        stepFunctionArn = existingMachine.stateMachineArn;
      } else {
        const result = await stepFunctionsClient.createStateMachine(stepFunctionParams).promise();

        stepFunctionArn = result.stateMachineArn;
      }
    } catch (error) {
      throw error;
    }

    return stepFunctionArn;
  }
}
