import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { MovieModel } from './models/movie.model';
import { FindMoviesInput } from './dto/find-movies.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { MoviesModel } from './models/movies.model';
import { ExternalIDModel } from 'src/external-id/models/external-id.model';
import MoviesLoader from './movie.loader';
import { MediaLinkModel } from 'src/media/models/media-link.model';
import { ImageLinkModel } from '../image/models/image-link.model';
import { FilmographyEntryMovieModel } from '../person/models/filmography-entry.model';
import { GenreModel } from 'src/genre/models/genre.model';
import { CountryModel } from 'src/country/models/country.model';
import { ReleaseDateModel } from 'src/release-date/models/release-date.model';
import { FactModel } from 'src/fact/models/fact.model';
import { SeasonModel } from 'src/season/models/season.model';
import { RatingModel } from 'src/rating/models/rating.model';
import { PageInfoModel } from 'src/page-info/page-info.model';
import { CreateMovieInput } from './dto/create-movie.input';

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

  @ResolveField('externalIDs', () => [ExternalIDModel], { nullable: true })
  async externalIDs(@Parent() movie: MovieModel): Promise<ExternalIDModel[]> {
    return this.moviesLoader.batchExternalIds.load(movie.id);
  }

  @ResolveField('medias', () => [MediaLinkModel], { nullable: true })
  async medias(@Parent() movie: MovieModel): Promise<MediaLinkModel[]> {
    return this.moviesLoader.batchMedias.load(movie.id);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async images(@Parent() movie: MovieModel): Promise<ImageLinkModel[]> {
    return this.moviesLoader.batchImages.load(movie.id);
  }

  @ResolveField('persons', () => [FilmographyEntryMovieModel], { nullable: true })
  async persons(@Parent() movie: MovieModel): Promise<FilmographyEntryMovieModel[]> {
    return this.moviesLoader.batchFilmographyEntry.load(movie.id);
  }

  @ResolveField('genres', () => [GenreModel], { nullable: true })
  async genres(@Parent() movie: MovieModel): Promise<GenreModel[]> {
    return this.moviesLoader.batchGenres.load(movie.id);
  }

  @ResolveField('countries', () => [CountryModel], { nullable: true })
  async countries(@Parent() movie: MovieModel): Promise<CountryModel[]> {
    return this.moviesLoader.batchCountries.load(movie.id);
  }

  @ResolveField('releases', () => [ReleaseDateModel], { nullable: true })
  async releases(@Parent() movie: MovieModel): Promise<ReleaseDateModel[]> {
    return this.moviesLoader.batchReleases.load(movie.id);
  }

  @ResolveField('facts', () => [FactModel], { nullable: true })
  async facts(@Parent() movie: MovieModel): Promise<FactModel[]> {
    return this.moviesLoader.batchFacts.load(movie.id);
  }

  @ResolveField('seasons', () => [SeasonModel], { nullable: true })
  async seasons(@Parent() movie: MovieModel): Promise<SeasonModel[]> {
    return this.moviesLoader.batchSeasons.load(movie.id);
  }

  @ResolveField('rating', () => RatingModel, { nullable: true })
  async rating(@Parent() movie: MovieModel): Promise<RatingModel> {
    return this.moviesLoader.batchRating.load(movie.ratingId);
  }

  @ResolveField('pageInfo', () => PageInfoModel, { nullable: true })
  async pageInfo(@Parent() movie: MovieModel): Promise<PageInfoModel> {
    return this.moviesLoader.batchPageInfo.load(movie.pageInfoId);
  }

  @Mutation(() => MovieModel)
  async createMovie(@Args('data') dto: CreateMovieInput): Promise<MovieModel> {
    return this.movieService.create(dto);
  }
}
