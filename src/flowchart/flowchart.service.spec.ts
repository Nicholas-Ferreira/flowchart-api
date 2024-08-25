import { Test, TestingModule } from '@nestjs/testing';
import { FlowchartService } from './flowchart.service';

describe('FlowchartService', () => {
  let service: FlowchartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowchartService],
    }).compile();

    service = module.get<FlowchartService>(FlowchartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
