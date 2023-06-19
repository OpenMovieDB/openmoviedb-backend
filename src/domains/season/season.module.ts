import { Module } from '@nestjs/common';
import { SeasonResolver } from './season.resolver';
import { SeasonService } from './season.service';

@Module({
  providers: [SeasonResolver, SeasonService],
  exports: [SeasonService],
})
export class SeasonModule {}
