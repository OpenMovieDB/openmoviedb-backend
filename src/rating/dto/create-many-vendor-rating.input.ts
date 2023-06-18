import { Field, Float, InputType } from '@nestjs/graphql';
import { VendorType } from '../models/vendor-rating.enum';
import { CreateVendorRatingInput } from './create-vendor-rating.input';

@InputType()
export class CreateManyVendorRatingInput {
  @Field((type) => CreateVendorRatingInput)
  vendorRatings: CreateVendorRatingInput[];
}
