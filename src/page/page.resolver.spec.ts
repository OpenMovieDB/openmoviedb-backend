import { Test, TestingModule } from '@nestjs/testing';
import { PageResolver } from './page.resolver';

describe('PageResolver', () => {
  let resolver: PageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageResolver],
    }).compile();

    resolver = module.get<PageResolver>(PageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
