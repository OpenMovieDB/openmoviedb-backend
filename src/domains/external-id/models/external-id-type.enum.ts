import { InputType, registerEnumType } from '@nestjs/graphql';
import { AbstractEnumFilterInput } from '../../../common/dto/abstract-enum-filter.input';

export enum ExternalIDSource {
  IMDB = 'IMDB',
  TMDB = 'TMDB',
  WIKIPEDIA = 'WIKIPEDIA',
  KINOPOISK = 'KINOPOISK',
}

registerEnumType(ExternalIDSource, {
  name: 'ExternalIDSource',
  description: 'Source of the external id',
});

export enum ExternalIDType {
  MOVIE = 'MOVIE',
  PERSON = 'PERSON',
}

registerEnumType(ExternalIDType, {
  name: 'ExternalIDType',
  description: 'Type of the external id',
});

@InputType()
export class ExternalIDSourceEnumInput extends AbstractEnumFilterInput(ExternalIDSource) {}

@InputType()
export class ExternalIDTypeEnumInput extends AbstractEnumFilterInput(ExternalIDType) {}
