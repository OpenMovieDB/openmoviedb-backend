import { InputType, Field } from '@nestjs/graphql';
import { NumberFilterInput } from 'src/common/dto/number-filter.input';
import { AbstractRelationFilterInput } from 'src/common/dto/abstract-relation-filter.input';
import { AbstractEntityFilterInput } from 'src/common/dto/abstract-entity-filter.input';
import { AbstractEnumFilterInput } from 'src/common/dto/abstract-enum-filter.input';
import { VendorType } from 'src/rating/models/vendor-rating.model';

@InputType()
export class RatingVendorEnumInput extends AbstractEnumFilterInput(VendorType) {}

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
