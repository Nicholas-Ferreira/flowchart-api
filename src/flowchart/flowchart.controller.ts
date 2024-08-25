import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateFlowchartDto } from './dto/create-flowchart.dto';
import { UpdateFlowchartDto } from './dto/update-flowchart.dto';
import { FlowchartService } from './flowchart.service';

@Controller('flowcharts')
export class FlowchartController {
  constructor(private readonly flowchartService: FlowchartService) {}

  @Post()
  create(@Body() createFlowchartDto: CreateFlowchartDto) {
    return this.flowchartService.create(createFlowchartDto);
  }

  @Get()
  findAll() {
    return this.flowchartService.findAll();
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
