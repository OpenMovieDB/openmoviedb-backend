import { Module } from '@nestjs/common';

import SlidesLoader from './slide.loader';
import { SlideResolver } from './slide.resolver';
import { SlideService } from './slide.service';
import { BlockModule } from '../block/block.module';
import { ImageModule } from '../image/image.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [BlockModule, ImageModule, MovieModule],
  providers: [SlideResolver, SlideService, SlidesLoader],
  exports: [SlideService],
})
export class SlideModule {}
