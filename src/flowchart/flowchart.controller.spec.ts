import { Test, TestingModule } from '@nestjs/testing';
import { FlowchartController } from './flowchart.controller';
import { FlowchartService } from './flowchart.service';

describe('FlowchartController', () => {
  let controller: FlowchartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowchartController],
      providers: [FlowchartService],
    }).compile();

    controller = module.get<FlowchartController>(FlowchartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
