import { Module } from '@nestjs/common';
import { SliderResolver } from './slider.resolver';
import { SliderService } from './slider.service';
import SlidersLoader from './slider.loader';
import { BlockModule } from '../block/block.module';
import { ImageModule } from '../image/image.module';
import { SlideModule } from '../slide/slide.module';

@Module({
  imports: [BlockModule, SlideModule, ImageModule],
  providers: [SliderResolver, SliderService, SlidersLoader],
  exports: [SliderService],
})
export class SliderModule {}
