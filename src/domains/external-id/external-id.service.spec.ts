import { Test, TestingModule } from '@nestjs/testing';
import { ExternalIDService } from './external-id.service';

describe('ExternalIDService', () => {
  let service: ExternalIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalIDService],
    }).compile();

    service = module.get<ExternalIDService>(ExternalIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
