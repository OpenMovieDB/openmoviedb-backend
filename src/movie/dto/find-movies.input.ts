import { InputType, Field } from '@nestjs/graphql';
import { NumberFilterInput } from 'src/common/dto/number-filter.input';
import { StringFilterInput } from 'src/common/dto/string-filter.input';
import { UuidFilterInput } from 'src/common/dto/uuid-filter.input';
import { RatingRelationInput } from './rating.input';
import { MovieTypeEnumInput } from '../models/movie-type.enum';

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
}
