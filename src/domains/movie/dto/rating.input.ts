import { Field, InputType } from '@nestjs/graphql';
import { NumberFilterInput } from '../../../common/dto/number-filter.input';
import { RatingVendorEnumInput } from '../../rating/models/vendor-rating.enum';
import { AbstractEntityFilterInput } from '../../../common/dto/abstract-entity-filter.input';
import { AbstractRelationFilterInput } from '../../../common/dto/abstract-relation-filter.input';

@InputType()
export class VendorRatingWhereInput {
  @Field({ nullable: true })
  value?: NumberFilterInput;

  @Field(() => RatingVendorEnumInput, { nullable: true })
  vendor?: RatingVendorEnumInput;
}

@InputType()
export class VendorRatingInput extends AbstractEntityFilterInput(VendorRatingWhereInput) {}

@InputType()
export class RatingWhereInput {
  @Field({ nullable: true })
  value?: NumberFilterInput;

  @Field(() => VendorRatingInput, { nullable: true })
  vendorRating?: VendorRatingInput;
}

@InputType()
export class RatingRelationInput extends AbstractRelationFilterInput(RatingWhereInput) {}
