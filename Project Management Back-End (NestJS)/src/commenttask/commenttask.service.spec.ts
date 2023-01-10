import { Test, TestingModule } from '@nestjs/testing';
import { CommenttaskService } from './commenttask.service';

describe('CommenttaskService', () => {
  let service: CommenttaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommenttaskService],
    }).compile();

    service = module.get<CommenttaskService>(CommenttaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
