import { Field, InputType } from '@nestjs/graphql';

import { RatingRelationInput } from './rating.input';
import { MovieTypeEnumInput } from '../models/movie-type.enum';
import { ExternalIdRelationInput } from './external-id.input';
import { GenreRelationInput } from './genre.input';
import { CountryRelationInput } from './country.input';
import { BaseFindManyInput } from '../../../common/dto/base-find-many.input';
import { StringFilterInput } from '../../../common/dto/string-filter.input';
import { NumberFilterInput } from '../../../common/dto/number-filter.input';

@InputType()
export class FindMoviesInput extends BaseFindManyInput {
  @Field({ nullable: true })
  title?: StringFilterInput;

  @Field({ nullable: true })
  slug?: StringFilterInput;

  @Field({ nullable: true })
  year?: NumberFilterInput;

  @Field({ nullable: true })
  type?: MovieTypeEnumInput;

  @Field({ nullable: true })
  rating?: RatingRelationInput;

  @Field({ nullable: true })
  externalID?: ExternalIdRelationInput;

  @Field({ nullable: true })
  genres?: GenreRelationInput;

  @Field({ nullable: true })
  countries?: CountryRelationInput;
}
