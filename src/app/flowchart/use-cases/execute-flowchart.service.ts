import { Injectable } from '@nestjs/common';
import { stepFunctionsClient } from 'src/config/aws.config';
import { FlowchartVersion } from 'src/shared/entities/flowchart-version.entity';

@Injectable()
export class ExecuteFlowchartService {
  async execute(flowchart: FlowchartVersion, input: any): Promise<any> {
    // Start the execution of the Step Function
    const executionParams = {
      stateMachineArn: flowchart.arn,
      input: JSON.stringify(input),
    };

    const execution = await stepFunctionsClient.startExecution(executionParams).promise();

    // Optionally wait for the execution to complete and return the result
    const executionResult = await this.waitForExecutionResult(execution.executionArn);

    return executionResult;
  }

  private async waitForExecutionResult(executionArn: string): Promise<any> {
    let status;
    let result;

    do {
      const { status: currentStatus, output } = await stepFunctionsClient
        .describeExecution({ executionArn })
        .promise();

      status = currentStatus;

      if (status === 'SUCCEEDED') {
        result = JSON.parse(output);
        break;
      } else if (status === 'FAILED' || status === 'TIMED_OUT' || status === 'ABORTED') {
        throw new Error(`Execution failed with status: ${status}`);
      }

      // Sleep for a while before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } while (status === 'RUNNING');

    return result;
  }
}
