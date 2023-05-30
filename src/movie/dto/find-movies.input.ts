import { InputType, Field } from '@nestjs/graphql';
import { NumberFilterInput } from 'src/common/dto/number-filter.input';
import { StringFilterInput } from 'src/common/dto/string-filter.input';
import { UuidFilterInput } from 'src/common/dto/uuid-filter.input';
import { RatingRelationInput } from './rating.input';
import { MovieTypeEnumInput } from '../models/movie-type.enum';
import { DateFilterInput } from 'src/common/dto/date-filter.input';
import { ExternalIdRelationInput } from './external-id.input';
import { GenreRelationInput } from './genre.input';
import { Country } from '@prisma/client';
import { CountryRelationInput } from './country.input';

@InputType()
export class FindMoviesInput {
  @Field({ nullable: true })
  id?: UuidFilterInput;

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

  @Field({ nullable: true })
  createdAt?: DateFilterInput;

  @Field({ nullable: true })
  updatedAt?: DateFilterInput;
}
