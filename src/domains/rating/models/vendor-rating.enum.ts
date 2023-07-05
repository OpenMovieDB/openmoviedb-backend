import { InputType, registerEnumType } from '@nestjs/graphql';
import { AbstractEnumFilterInput } from '../../../common/dto/abstract-enum-filter.input';

export enum VendorType {
  KINOPOISK = 'KINOPOISK',
  IMDB = 'IMDB',
  TMDB = 'TMDB',
  ROTTEN_TOMATOES = 'ROTTEN_TOMATOES',
}

registerEnumType(VendorType, {
  name: 'VendorType',
  description: 'Vendor rating',
});

@InputType()
export class RatingVendorEnumInput extends AbstractEnumFilterInput(VendorType) {}
