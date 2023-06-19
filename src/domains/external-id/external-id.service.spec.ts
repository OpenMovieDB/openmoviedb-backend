import { Test, TestingModule } from '@nestjs/testing';
import { ExternalIdService } from './external-id.service';

describe('ExternalIdService', () => {
  let service: ExternalIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalIdService],
    }).compile();

    service = module.get<ExternalIdService>(ExternalIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
