import { PartialType } from '@nestjs/mapped-types';
import { CreateFlowchartDto } from './create-flowchart.dto';

export class UpdateFlowchartDto extends PartialType(CreateFlowchartDto) {}
