import { ExternalID } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { ExternalIDModel } from './models/external-id.model';
import { ExternalIDSource, ExternalIDType } from './models/external-id-type.enum';

type ExternalIDEntity = ExternalID;

export class ExternalIDMapper implements IMapper<ExternalIDEntity, ExternalIDModel> {
  public mapEntityToModel(entity: ExternalIDEntity): ExternalIDModel {
    return {
      ...entity,
      source: ExternalIDSource[entity.source],
      type: ExternalIDType[entity.type],
    };
  }

  public mapEntitiesToModels(entities: ExternalIDEntity[]): ExternalIDModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
