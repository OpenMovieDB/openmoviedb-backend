import { Test, TestingModule } from '@nestjs/testing';
import { ExternalIdResolver } from './external-id.resolver';

describe('ExternalIdResolver', () => {
  let resolver: ExternalIdResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalIdResolver],
    }).compile();

    resolver = module.get<ExternalIdResolver>(ExternalIdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
