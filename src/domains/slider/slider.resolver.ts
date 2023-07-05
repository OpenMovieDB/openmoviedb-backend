import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SliderModel } from './models/slider.model';
import SlidersLoader from './slider.loader';
import { SliderService } from './slider.service';
import { FindSlidersInput } from './dto/find-slider.input';
import { SlidersModel } from './models/sliders.model';

import { BaseResolver } from '../../common/resolvers/base.resolver';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';
import { SlideModel } from '../slide/models/slide.model';

@Resolver(() => SliderModel)
export class SliderResolver extends BaseResolver(
  'Slider',
  SliderModel,
  SlidersModel,
  FindSlidersInput,
  CreateSliderInput,
  UpdateSliderInput,
  SliderService,
) {
  constructor(
    private readonly slidersLoader: SlidersLoader,
    private readonly sliderService: SliderService,
  ) {
    super(sliderService);
  }

  @ResolveField('slides', () => [SlideModel], { nullable: true })
  async sliderSlides(@Parent() slider: SliderModel): Promise<SlideModel[]> {
    return this.slidersLoader.batchSlides.load(slider.id);
  }
}
