import { Test, TestingModule } from '@nestjs/testing';
import { ReleaseDateService } from './release-date.service';

describe('ReleaseDateService', () => {
  let service: ReleaseDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReleaseDateService],
    }).compile();

    service = module.get<ReleaseDateService>(ReleaseDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
