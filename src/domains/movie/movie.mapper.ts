import { Movie } from '@prisma/client';
import { IMapper } from 'src/common/interfaces/mapper.interface';
import { MovieModel } from './models/movie.model';
import { MovieType } from './models/movie-type.enum';

export type MovieEntity = Movie;

export class MovieMapper implements IMapper<MovieEntity, MovieModel> {
  public mapEntityToModel(entity: MovieEntity): MovieModel {
    return {
      ...entity,
      type: MovieType[entity.type],
    };
  }

  public mapEntitiesToModels(entities: MovieEntity[]): MovieModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
