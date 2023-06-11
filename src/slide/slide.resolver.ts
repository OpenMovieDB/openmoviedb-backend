import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import SlidesLoader from './slide.loader';
import { SlideModel } from './models/slide.model';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { SlidesModel } from './models/slides.model';
import { FindSlidesInput } from './dto/find-slides.input';
import { SlideService } from './slide.service';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import { MovieModel } from 'src/movie/models/movie.model';

@Resolver(() => SlideModel)
export class SlideResolver {
  constructor(private readonly slidersLoader: SlidesLoader, private readonly sliderService: SlideService) {}

  @Query(() => SlideModel)
  async slide(@Args('id') id: string): Promise<SlideModel> {
    return this.sliderService.findOne(id);
  }

  @Query(() => [SlidesModel])
  async slides(@Args() pagination: PaginationArgs, @Args('data') dto: FindSlidesInput): Promise<SlidesModel> {
    return this.sliderService.findMany(pagination, dto);
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