import { Test, TestingModule } from '@nestjs/testing';
import { CommenteventController } from './commentevent.controller';

describe('CommenteventController', () => {
  let controller: CommenteventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommenteventController],
    }).compile();

    controller = module.get<CommenteventController>(CommenteventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
