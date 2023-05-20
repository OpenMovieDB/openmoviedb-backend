import { Module } from '@nestjs/common';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';

@Module({
  providers: [MediaResolver, MediaService]
})
export class MediaModule {}
