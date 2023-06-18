import { Field, Float, InputType } from '@nestjs/graphql';
import { CreateVendorRatingInput } from './create-vendor-rating.input';

@InputType()
export class UpdateVendorRatingInput {
  @Field((type) => Float)
  value: number;
}
