import { Test, TestingModule } from '@nestjs/testing';
import { BlockResolver } from './block.resolver';

describe('BlockResolver', () => {
  let resolver: BlockResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockResolver],
    }).compile();

    resolver = module.get<BlockResolver>(BlockResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
