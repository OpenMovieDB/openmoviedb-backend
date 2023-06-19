import { Rating, VendorRating } from '@prisma/client';
import { RatingModel } from './models/rating.model';
import { IMapper } from '../../common/interfaces/mapper.interface';
import { VendorType } from './models/vendor-rating.enum';

type RatingEntity = Rating & {
  vendorRatings: VendorRating[];
};

export class RatingMapper implements IMapper<RatingEntity, RatingModel> {
  public mapEntityToModel(entity: RatingEntity): RatingModel {
    return {
      ...entity,
      value:
        entity.vendorRatings.reduce((acc, vendorRating) => acc + vendorRating.value, 0) / entity.vendorRatings.length,
      vendorRatings: entity.vendorRatings.map((vendorRating) => ({
        ...vendorRating,
        vendor: VendorType[vendorRating.vendor],
      })),
    };
  }

  public mapEntitiesToModels(entities: RatingEntity[]): RatingModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
