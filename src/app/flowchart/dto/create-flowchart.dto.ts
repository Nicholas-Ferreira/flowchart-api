import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowchartDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
