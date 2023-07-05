import { InputType, registerEnumType } from '@nestjs/graphql';
import { AbstractEnumFilterInput } from '../../../common/dto/abstract-enum-filter.input';

export enum MovieType {
  MOVIE = 'MOVIE',
  TV_SERIES = 'TV_SERIES',
}

registerEnumType(MovieType, {
  name: 'MovieType',
  description: 'Type of the movie',
});

@InputType()
export class MovieTypeEnumInput extends AbstractEnumFilterInput(MovieType) {}
