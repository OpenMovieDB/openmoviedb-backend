import { Test, TestingModule } from '@nestjs/testing';
import { SlideResolver } from './slide.resolver';

describe('SlideResolver', () => {
  let resolver: SlideResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideResolver],
    }).compile();

    resolver = module.get<SlideResolver>(SlideResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
