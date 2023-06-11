import { Module } from '@nestjs/common';
import { SliderResolver } from './slider.resolver';
import { SliderService } from './slider.service';
import SlidersLoader from './slider.loader';
import { BlockModule } from 'src/block/block.module';
import { SlideModule } from 'src/slide/slide.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [BlockModule, SlideModule, ImageModule],
  providers: [SliderResolver, SliderService, SlidersLoader],
  exports: [SliderService],
})
export class SliderModule {}
