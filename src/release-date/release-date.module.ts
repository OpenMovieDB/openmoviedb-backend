import { Module } from '@nestjs/common';
import { ReleaseDateResolver } from './release-date.resolver';
import { ReleaseDateService } from './release-date.service';

@Module({
  providers: [ReleaseDateResolver, ReleaseDateService]
})
export class ReleaseDateModule {}
