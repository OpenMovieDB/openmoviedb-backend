import { Rating } from '@prisma/client';
import { RatingModel } from './models/rating.model';
import { IMapper } from '../common/interfaces/mapper.interface';

type RatingEntity = Rating;

export class RatingMapper implements IMapper<RatingEntity, RatingModel> {
  public mapEntityToModel(entity: RatingEntity): RatingModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: RatingEntity[]): RatingModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
