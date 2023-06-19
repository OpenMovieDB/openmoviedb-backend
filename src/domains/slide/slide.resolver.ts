import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import SlidesLoader from './slide.loader';
import { SlideModel } from './models/slide.model';
import { SlidesModel } from './models/slides.model';
import { FindSlidesInput } from './dto/find-slides.input';
import { SlideService } from './slide.service';
import { ImageLinkModel } from 'src/domains/image/models/image-link.model';
import { MovieModel } from 'src/domains/movie/models/movie.model';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { CreateSlideInput } from './dto/create-slide.input';
import { UpdateSlideInput } from './dto/update-slide.input';

@Resolver(() => SlideModel)
export class SlideResolver extends BaseResolver(
  'Slide',
  SlideModel,
  SlidesModel,
  FindSlidesInput,
  CreateSlideInput,
  UpdateSlideInput,
  SlideService,
) {
  constructor(private readonly slidersLoader: SlidesLoader, private readonly sliderService: SlideService) {
    super(sliderService);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async slideImages(@Parent() movie: MovieModel): Promise<ImageLinkModel[]> {
    return this.slidersLoader.batchImages.load(movie.id);
  }

  @ResolveField('movie', () => MovieModel, { nullable: true })
  async slideMovie(@Parent() movie: MovieModel): Promise<MovieModel> {
    return this.slidersLoader.batchMovies.load(movie.id);
  }
}
