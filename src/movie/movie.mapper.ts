import { IMapper } from 'src/common/interfaces/mapper.interface';
import { MovieModel, MovieType } from './models/movie.model';
import { Country, Genre, Movie, PageInfo, Rating, ReleaseDate, Season } from '@prisma/client';

export type MovieEntity = Movie;

export class MovieMapper implements IMapper<MovieEntity, MovieModel> {
  public mapEntityToModel(entity: MovieEntity): MovieModel {
    return {
      ...entity,
      type: MovieType[entity.type] as MovieType,
    };
  }

  public mapEntitiesToModels(entities: MovieEntity[]): MovieModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
