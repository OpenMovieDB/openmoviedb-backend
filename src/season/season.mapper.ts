import { Season } from '@prisma/client';
import { IMapper } from '../common/interfaces/mapper.interface';
import { SeasonModel } from './models/season.model';

type SeasonEntity = Season;

export class SeasonMapper implements IMapper<SeasonEntity, SeasonModel> {
  public mapEntityToModel(entity: SeasonEntity): SeasonModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: SeasonEntity[]): SeasonModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
