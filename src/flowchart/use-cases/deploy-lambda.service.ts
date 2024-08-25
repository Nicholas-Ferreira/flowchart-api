import { Injectable } from '@nestjs/common';
import { lambdaClient } from '../../config/aws.config';
import { Flowchart } from '../../shared/entities/flowchart.entity';

@Injectable()
export class DeployLambdaService {
  async execute(flowchart: Flowchart): Promise<void> {
    for (const state of flowchart.states) {
      if (state.type === 'Task' && state.lambda) {
        const lambdaParams = {
          FunctionName: state.lambda.name,
          Runtime: 'nodejs18.x',
          Role: 'arn:aws:iam::123456789012:role/execution_role', // Substitua pelo ARN da role apropriada
          Handler: 'index.handler',
          Code: {
            ZipFile: Buffer.from(state.lambda.sourceCode), // Supõe-se que o código fonte esteja em state.lambda.sourceCode
          },
        };

        try {
          await lambdaClient.getFunction({ FunctionName: state.lambda.name }).promise();
          await lambdaClient
            .updateFunctionCode({
              FunctionName: state.lambda.name,
              ZipFile: lambdaParams.Code.ZipFile,
            })
            .promise();
        } catch (error) {
          if (error.code === 'ResourceNotFoundException') {
            await lambdaClient.createFunction(lambdaParams).promise();
          } else {
            throw error;
          }
        }
      }
    }
  }
}
