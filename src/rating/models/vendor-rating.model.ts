import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class VendorRatingModel extends BaseModel {
  @Field()
  vendor: string;

  @Field((type) => Float)
  value: number;

  @Field()
  ratingId: string;
}
