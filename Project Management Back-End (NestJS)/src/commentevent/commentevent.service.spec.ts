import { Test, TestingModule } from '@nestjs/testing';
import { CommentEventService } from './commentevent.service';

describe('CommenteventService', () => {
  let service: CommentEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentEventService],
    }).compile();

    service = module.get<CommentEventService>(CommentEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
