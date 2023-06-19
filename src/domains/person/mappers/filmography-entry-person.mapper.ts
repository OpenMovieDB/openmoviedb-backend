import { FilmographyEntry } from '@prisma/client';
import { IMapper } from '../../../common/interfaces/mapper.interface';
import { FilmographyEntryPersonModel, PersonRoleType } from '../models/filmography-entry.model';
import { MovieEntity, MovieMapper } from '../../movie/movie.mapper';

type FilmographyEntryPersonEntity = FilmographyEntry & { movie: MovieEntity };

export class FilmographyEntryPersonMapper
  implements IMapper<FilmographyEntryPersonEntity, FilmographyEntryPersonModel>
{
  public mapEntityToModel(entity: FilmographyEntryPersonEntity): FilmographyEntryPersonModel {
    return {
      ...entity,
      movie: new MovieMapper().mapEntityToModel(entity.movie),
      role: PersonRoleType[entity.role],
    };
  }

  public mapEntitiesToModels(entities: FilmographyEntryPersonEntity[]): FilmographyEntryPersonModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
