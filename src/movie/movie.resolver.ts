import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { MovieModel } from './models/movie.model';
import { FindMoviesInput } from './dto/find-movies.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { MoviesModel } from './models/movies.model';
import { ExternalIDModel } from 'src/external-id/models/external-id.model';
import MoviesLoader from './movie.loader';
import { MediaLinkModel } from 'src/media/models/media-link.model';

@Resolver(() => MovieModel)
export class MovieResolver {
  constructor(private readonly movieService: MovieService, private readonly moviesLoader: MoviesLoader) {}

  @Query(() => MovieModel)
  async movie(@Args('id') id: string): Promise<MovieModel> {
    return this.movieService.findOne(id);
  }

  @Query(() => MoviesModel)
  async movies(@Args() pagination: PaginationArgs, @Args('data') dto: FindMoviesInput): Promise<MoviesModel> {
    return this.movieService.findMany(pagination, dto);
  }

  // TODO: Поля которые нужны обязательно обработать через даталоадер
  //  medias
  //  images
  //  persons
  //  genres
  //  countries
  //  releases
  //  seasons
  //  collection
  //  slides
  //  facts

  @ResolveField('externalIDs', () => [ExternalIDModel], { nullable: true })
  async externalIDs(@Parent() movie: MovieModel): Promise<ExternalIDModel[]> {
    return this.moviesLoader.batchExternalIds.load(movie.id);
  }

  @ResolveField('medias', () => [MediaLinkModel], { nullable: true })
  async medias(@Parent() movie: MovieModel): Promise<MediaLinkModel[]> {
    return this.moviesLoader.batchMedias.load(movie.id);
  }
}
