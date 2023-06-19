import { Fact } from '@prisma/client';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { FactModel } from './models/fact.model';

type FactEntity = Fact;

export class FactMapper implements IMapper<FactEntity, FactModel> {
  public mapEntityToModel(entity: FactEntity): FactModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: FactEntity[]): FactModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
