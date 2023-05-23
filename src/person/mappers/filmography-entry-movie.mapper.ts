import { FilmographyEntry } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { FilmographyEntryMovieModel, PersonRoleType } from '../models/filmography-entry.model';
import { PersonEntity, PersonMapper } from './person.mapper';

type FilmographyEntryMovieEntity = FilmographyEntry & { person: PersonEntity };

export class FilmographyEntryMovieMapper implements IMapper<FilmographyEntryMovieEntity, FilmographyEntryMovieModel> {
  public mapEntityToModel(entity: FilmographyEntryMovieEntity): FilmographyEntryMovieModel {
    return {
      ...entity,
      person: new PersonMapper().mapEntityToModel(entity.person),
      role: PersonRoleType[entity.role],
    };
  }

  public mapEntitiesToModels(entities: FilmographyEntryMovieEntity[]): FilmographyEntryMovieModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
