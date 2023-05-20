import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeResolver } from './episode.resolver';

describe('EpisodeResolver', () => {
  let resolver: EpisodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpisodeResolver],
    }).compile();

    resolver = module.get<EpisodeResolver>(EpisodeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
