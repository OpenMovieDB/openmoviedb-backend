import { ExternalID } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { ExternalIDModel } from './models/external-id.model';

type ExternalIDEntity = ExternalID;

export class ExternalIDMapper
  implements IMapper<ExternalIDEntity, ExternalIDModel>
{
  public mapEntityToModel(entity: ExternalIDEntity): ExternalIDModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: ExternalIDEntity[]): ExternalIDModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
