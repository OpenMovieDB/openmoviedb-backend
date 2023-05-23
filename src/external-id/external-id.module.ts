import { Module } from '@nestjs/common';
import { ExternalIdResolver } from './external-id.resolver';
import { ExternalIdService } from './external-id.service';

@Module({
  providers: [ExternalIdResolver, ExternalIdService],
  exports: [ExternalIdService],
})
export class ExternalIdModule {}
