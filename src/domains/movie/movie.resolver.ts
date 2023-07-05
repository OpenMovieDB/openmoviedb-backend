import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { MovieModel } from './models/movie.model';
import { FindMoviesInput } from './dto/find-movies.input';
import { MoviesModel } from './models/movies.model';

import MoviesLoader from './movie.loader';

import { ImageLinkModel } from '../image/models/image-link.model';
import { FilmographyEntryMovieModel } from '../person/models/filmography-entry.model';

import { CreateMovieInput } from './dto/create-movie.input';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { UpdateMovieInput } from './dto/update-movie.input';
import { ExternalIDModel } from '../external-id/models/external-id.model';
import { MediaLinkModel } from '../media/models/media-link.model';
import { GenreModel } from '../genre/models/genre.model';
import { CountryModel } from '../country/models/country.model';
import { ReleaseDateModel } from '../release-date/models/release-date.model';
import { FactModel } from '../fact/models/fact.model';
import { SeasonModel } from '../season/models/season.model';
import { RatingModel } from '../rating/models/rating.model';
import { PageInfoModel } from '../page-info/models/page-info.model';

@Resolver(() => MovieModel)
export class MovieResolver extends BaseResolver(
  'Movie',
  MovieModel,
  MoviesModel,
  FindMoviesInput,
  CreateMovieInput,
  UpdateMovieInput,
  MovieService,
) {
  constructor(
    private readonly movieService: MovieService,
    private readonly moviesLoader: MoviesLoader,
  ) {
    super(movieService);
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
}
