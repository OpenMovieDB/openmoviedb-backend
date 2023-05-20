import { Test, TestingModule } from '@nestjs/testing';
import { SeoResolver } from './seo.resolver';

describe('SeoResolver', () => {
  let resolver: SeoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeoResolver],
    }).compile();

    resolver = module.get<SeoResolver>(SeoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
