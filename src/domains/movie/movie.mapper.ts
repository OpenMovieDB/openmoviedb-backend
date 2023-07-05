import { Movie } from '@prisma/client';

import { MovieModel } from './models/movie.model';
import { MovieType } from './models/movie-type.enum';
import { IMapper } from '../../common/interfaces/mapper.interface';

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
