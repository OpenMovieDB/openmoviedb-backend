import { Test, TestingModule } from '@nestjs/testing';
import { GenreResolver } from './genre.resolver';

describe('GenreResolver', () => {
  let resolver: GenreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreResolver],
    }).compile();

    resolver = module.get<GenreResolver>(GenreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
