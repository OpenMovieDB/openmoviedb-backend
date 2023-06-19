import { Field, Float, InputType } from '@nestjs/graphql';
import { VendorType } from '../models/vendor-rating.enum';

@InputType()
export class CreateVendorRatingInput {
  @Field((type) => VendorType)
  vendor: VendorType;

  @Field((type) => Float)
  value: number;

  @Field()
  ratingId: string;
}
