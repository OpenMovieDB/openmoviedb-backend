import { Test, TestingModule } from '@nestjs/testing';
import { ReleaseDateResolver } from './release-date.resolver';

describe('ReleaseDateResolver', () => {
  let resolver: ReleaseDateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReleaseDateResolver],
    }).compile();

    resolver = module.get<ReleaseDateResolver>(ReleaseDateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
