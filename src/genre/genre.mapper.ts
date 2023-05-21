import { Genre } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { GenreModel } from './models/genre.model';

type GenreEntity = Genre;

export class GenreMapper implements IMapper<GenreEntity, GenreModel> {
  public mapEntityToModel(entity: GenreEntity): GenreModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: GenreEntity[]): GenreModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
