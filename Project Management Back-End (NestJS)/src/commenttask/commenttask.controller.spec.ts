import { Test, TestingModule } from '@nestjs/testing';
import { CommenttaskController } from './commenttask.controller';

describe('CommenttaskController', () => {
  let controller: CommenttaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommenttaskController],
    }).compile();

    controller = module.get<CommenttaskController>(CommenttaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
