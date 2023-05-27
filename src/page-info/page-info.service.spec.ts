import { Test, TestingModule } from '@nestjs/testing';
import { PageInfoService } from './page-info.service';

describe('PageInfoService', () => {
  let service: PageInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageInfoService],
    }).compile();

    service = module.get<PageInfoService>(PageInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
