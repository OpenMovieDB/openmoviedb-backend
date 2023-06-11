import { Module } from '@nestjs/common';

import SlidersLoader from './slide.loader';
import { BlockModule } from 'src/block/block.module';
import SlidesLoader from './slide.loader';
import { SlideResolver } from './slide.resolver';
import { SlideService } from './slide.service';
import { ImageModule } from 'src/image/image.module';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [BlockModule, ImageModule, MovieModule],
  providers: [SlideResolver, SlideService, SlidesLoader],
  exports: [SlideService],
})
export class SlideModule {}
