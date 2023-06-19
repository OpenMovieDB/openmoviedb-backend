import { Test, TestingModule } from '@nestjs/testing';
import { RatingResolver } from './rating.resolver';

describe('RatingResolver', () => {
  let resolver: RatingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingResolver],
    }).compile();

    resolver = module.get<RatingResolver>(RatingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
