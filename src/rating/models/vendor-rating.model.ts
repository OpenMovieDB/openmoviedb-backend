import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { VendorType } from './vendor-rating.enum';

@ObjectType()
export class VendorRatingModel extends BaseModel {
  @Field((type) => VendorType, { nullable: true })
  vendor: VendorType;

  @Field((type) => Float)
  value: number;

  @Field()
  ratingId: string;
}
