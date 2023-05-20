import { Module } from '@nestjs/common';
import { EpisodeResolver } from './episode.resolver';
import { EpisodeService } from './episode.service';

@Module({
  providers: [EpisodeResolver, EpisodeService]
})
export class EpisodeModule {}
