import { Field, ObjectType } from '@nestjs/graphql';
import { VoteModel } from './vote.model';
import { VendorRatingModel } from './vendor-rating.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class RatingModel extends BaseModel {
  value: number;

  @Field((type) => [VendorRatingModel], { nullable: 'itemsAndList' })
  vendorRatings?: VendorRatingModel[];
}
