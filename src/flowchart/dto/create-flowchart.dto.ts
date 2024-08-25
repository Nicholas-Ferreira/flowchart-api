import { IsJSON, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateFlowchartDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  projectId: number;

  @IsNotEmpty()
  @IsJSON()
  definitionASL: any;
}
