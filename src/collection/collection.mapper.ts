import { Collection } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { CollectionModel } from './models/collection.model';

type CollectionEntity = Collection;

export class CollectionMapper implements IMapper<CollectionEntity, CollectionModel> {
  public mapEntityToModel(entity: CollectionEntity): CollectionModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: CollectionEntity[]): CollectionModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
