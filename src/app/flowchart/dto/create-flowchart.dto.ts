import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowchartDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsJSON()
  definitionASL: any;
}
