import { Test, TestingModule } from '@nestjs/testing';
import { PageInfoResolver } from './page-info.resolver';

describe('PageInfoResolver', () => {
  let resolver: PageInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageInfoResolver],
    }).compile();

    resolver = module.get<PageInfoResolver>(PageInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
