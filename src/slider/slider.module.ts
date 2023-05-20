import { Module } from '@nestjs/common';
import { SliderResolver } from './slider.resolver';
import { SliderService } from './slider.service';

@Module({
  providers: [SliderResolver, SliderService]
})
export class SliderModule {}
