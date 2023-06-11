import { Test, TestingModule } from '@nestjs/testing';
import { SlideService } from './slide.service';

describe('SlideService', () => {
  let service: SlideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideService],
    }).compile();

    service = module.get<SlideService>(SlideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
