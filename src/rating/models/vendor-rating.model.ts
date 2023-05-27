import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

export enum VendorType {
  KINOPOISK,
  IMDB,
  TMDB,
  ROTTEN_TOMATOES,
}

registerEnumType(VendorType, {
  name: 'VendorType',
  description: 'Vendor rating',
});

@ObjectType()
export class VendorRatingModel extends BaseModel {
  @Field((type) => VendorType)
  vendor: VendorType;

  @Field((type) => Float)
  value: number;

  @Field()
  ratingId: string;
}
