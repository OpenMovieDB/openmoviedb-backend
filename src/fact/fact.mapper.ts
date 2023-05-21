import { IMapper } from 'src/common/interfaces/mapper.interface';
import { FactModel } from './models/Fact.model';
import { Fact } from '@prisma/client';

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
