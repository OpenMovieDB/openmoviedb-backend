import { IMapper } from 'src/common/interfaces/mapper.interface';
import { MovieModel, MovieType } from './models/movie.model';
import {
  Country,
  ExternalID,
  FilmographyEntry,
  Genre,
  ImageLink,
  MediaLink,
  Movie,
  PageInfo,
  Rating,
  ReleaseDate,
  Season,
} from '@prisma/client';

type MovieEntity = Movie & {
  externalID: ExternalID[];
  medias: MediaLink[];
  images: ImageLink[];
  persons: FilmographyEntry[];
  genres: Genre[];
  countries: Country[];
  releases: ReleaseDate[];
  seasons: Season[];
  rating: Rating;
  pageInfo: PageInfo;
};

export class MovieMapper implements IMapper<MovieEntity, MovieModel> {
  public mapEntityToModel(entity: MovieEntity): MovieModel {
    return {
      ...entity,
      pageInfo: [] as any,
      seo: [] as any,
      slug: entity.slug,
      type: MovieType[entity.type] as MovieType,
      externalIDs: [] as any,
      title: entity.title,
      originalTitle: entity.originalTitle,
      description: entity.description,
      year: entity.year,
      medias: [] as any,
      images: [] as any,
      persons: [] as any,
      genres: [] as any,
      countries: [] as any,
      releases: [] as any,
      seasons: [] as any,
      rating: entity.rating,
      facts: [] as any,
    };
  }

  public mapEntitiesToModels(entities: MovieEntity[]): MovieModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
