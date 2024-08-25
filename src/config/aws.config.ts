import { Lambda, S3, StepFunctions } from 'aws-sdk';

const localStackEndpoint = 'http://localhost:4566';

export const s3Client = new S3({
  endpoint: localStackEndpoint,
  region: 'us-east-1',
  s3ForcePathStyle: true,
  accessKeyId: 'test',
  secretAccessKey: 'test',
});

export const lambdaClient = new Lambda({
  endpoint: localStackEndpoint,
  region: 'us-east-1',
  accessKeyId: 'test',
  secretAccessKey: 'test',
});

export const stepFunctionsClient = new StepFunctions({
  endpoint: localStackEndpoint,
  region: 'us-east-1',
  accessKeyId: 'test',
  secretAccessKey: 'test',
});
