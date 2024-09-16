import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/entities/user.entity';
import { IsMemberOfOrganizationGuard } from 'src/shared/guards/is-member.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CreateFlowchartDto } from './dto/create-flowchart.dto';
import { UpdateFlowchartDto } from './dto/update-flowchart.dto';
import { FlowchartService } from './flowchart.service';

@UseGuards(AuthGuard(), IsMemberOfOrganizationGuard)
@Controller('organization/:organizationId/flowchart')
export class FlowchartController {
  constructor(private readonly flowchartService: FlowchartService) {}

  @Post()
  async create(
    @Param('organizationId') organizationId: string,
    @GetUser() user: User,
    @Body() createFlowchartDto: CreateFlowchartDto,
  ) {
    return this.flowchartService.create(user, organizationId, createFlowchartDto);
  }

  @Get()
  async findAllFlowcharts(@Param('organizationId') organizationId: string) {
    return this.flowchartService.findAll(organizationId);
  }

  @Get(':flowchartId')
  async findOne(@Param('flowchartId') flowchartId: string) {
    return this.flowchartService.findOne(flowchartId);
  }

  @Patch(':flowchartId')
  async update(
    @Param('flowchartId') flowchartId: string,
    @GetUser() user: User,
    @Body() updateFlowchartDto: UpdateFlowchartDto,
  ) {
    return this.flowchartService.update(flowchartId, updateFlowchartDto);
  }

  @Delete(':flowchartId')
  async delete(@Param('flowchartId') flowchartId: string, @GetUser() user: User) {
    return this.flowchartService.remove(user, flowchartId);
  }

  @Post(':flowchartId/deploy')
  @HttpCode(200)
  deploy(@Param('flowchartId') flowchartId: string) {
    return this.flowchartService.deploy(flowchartId);
  }

  @Post(':flowchartId/execute')
  @HttpCode(200)
  execute(@Param('flowchartId') flowchartId: string, @Body() input: any) {
    return this.flowchartService.execute(flowchartId, input);
  }
}
