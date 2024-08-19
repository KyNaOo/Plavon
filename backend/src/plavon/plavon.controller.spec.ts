import { Test, TestingModule } from '@nestjs/testing';
import { PlavonController } from './plavon.controller';
import { PlavonService } from './plavon.service';

describe('PlavonController', () => {
  let controller: PlavonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlavonController],
      providers: [PlavonService],
    }).compile();

    controller = module.get<PlavonController>(PlavonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
