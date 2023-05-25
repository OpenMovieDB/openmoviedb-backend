import { ReleaseDate } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { ReleaseDateModel, ReleaseDateType } from './models/release-date.model';

type ReleaseDateEntity = ReleaseDate;

export class ReleaseDateMapper implements IMapper<ReleaseDateEntity, ReleaseDateModel> {
  public mapEntityToModel(entity: ReleaseDateEntity): ReleaseDateModel {
    return {
      ...entity,
      type: ReleaseDateType[entity.type],
    };
  }

  public mapEntitiesToModels(entities: ReleaseDateEntity[]): ReleaseDateModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
