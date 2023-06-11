import { Module } from '@nestjs/common';
import { ExternalIdResolver } from './external-id.resolver';
import { ExternalIDService } from './external-id.service';

@Module({
  providers: [ExternalIdResolver, ExternalIDService],
  exports: [ExternalIDService],
})
export class ExternalIdModule {}
