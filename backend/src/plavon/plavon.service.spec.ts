import { Test, TestingModule } from '@nestjs/testing';
import { PlavonService } from './plavon.service';

describe('PlavonService', () => {
  let service: PlavonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlavonService],
    }).compile();

    service = module.get<PlavonService>(PlavonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
