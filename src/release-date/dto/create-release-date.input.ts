import { Field, InputType } from '@nestjs/graphql';
import { ReleaseDateType } from '../models/release-date-type.enum';

@InputType()
export class CreateReleaseDateInput {
  @Field()
  movieId?: string;

  @Field()
  seasonId?: string;

  @Field()
  episodeId?: string;

  @Field()
  countryId?: string;

  @Field((type) => ReleaseDateType)
  type: ReleaseDateType;

  @Field()
  date: Date;
}
