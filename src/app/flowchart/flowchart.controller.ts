import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFlowchartDto } from './dto/create-flowchart.dto';
import { UpdateFlowchartDto } from './dto/update-flowchart.dto';
import { FlowchartService } from './flowchart.service';

@UseGuards(AuthGuard())
@Controller('flowchart')
export class FlowchartController {
  constructor(private readonly flowchartService: FlowchartService) {}

  @Post()
  create(@Body() createFlowchartDto: CreateFlowchartDto) {
    return this.flowchartService.create(createFlowchartDto);
  }

  @Get()
  findAll(@Query('projectId') projectId?: string) {
    return this.flowchartService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.flowchartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFlowchartDto: UpdateFlowchartDto) {
    return this.flowchartService.update(id, updateFlowchartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.flowchartService.remove(id);
  }

  @Post(':id/deploy')
  @HttpCode(200)
  deploy(@Param('id') id: number) {
    return this.flowchartService.deploy(id);
  }

  @Post(':id/execute')
  @HttpCode(200)
  execute(@Param('id') id: number, @Body() input: any) {
    return this.flowchartService.execute(id, input);
  }
}
