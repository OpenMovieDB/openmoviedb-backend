import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SliderModel } from './models/slider.model';
import SlidersLoader from './slider.loader';
import { SliderService } from './slider.service';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FindSlidersInput } from './dto/find-slider.input';
import { SlidersModel } from './models/sliders.model';
import { SlideModel } from 'src/slide/models/slide.model';

@Resolver(() => SliderModel)
export class SliderResolver {
  constructor(private readonly slidersLoader: SlidersLoader, private readonly sliderService: SliderService) {}

  @Query(() => SliderModel)
  async slider(@Args('id') id: string): Promise<SliderModel> {
    return this.sliderService.findOne(id);
  }

  @Query(() => [SlidersModel])
  async sliders(@Args() pagination: PaginationArgs, @Args('data') dto: FindSlidersInput): Promise<SlidersModel> {
    return this.sliderService.findMany(pagination, dto);
  }

  @ResolveField('slides', () => [SlideModel], { nullable: true })
  async sliderSlides(@Parent() slider: SliderModel): Promise<SlideModel[]> {
    return this.slidersLoader.batchSlides.load(slider.id);
  }
}
