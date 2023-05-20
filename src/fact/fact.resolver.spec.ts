import { Test, TestingModule } from '@nestjs/testing';
import { FactResolver } from './fact.resolver';

describe('FactResolver', () => {
  let resolver: FactResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactResolver],
    }).compile();

    resolver = module.get<FactResolver>(FactResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
