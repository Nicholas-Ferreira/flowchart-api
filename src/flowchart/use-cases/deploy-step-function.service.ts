import { Injectable } from '@nestjs/common';
import { stepFunctionsClient } from 'src/config/aws.config';
import { Flowchart } from '../../shared/entities/flowchart.entity';

@Injectable()
export class DeployStepFunctionService {
  async execute(flowchart: Flowchart): Promise<string> {
    const stepFunctionParams = {
      name: `StepFunction_${flowchart.id}_${Date.now()}`,
      definition: JSON.stringify(flowchart.definitionASL),
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
