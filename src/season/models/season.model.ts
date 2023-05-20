import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReleaseDateModel } from 'src/release-date/models/release-date.model';
import { EpisodeModel } from './episode.model';

@ObjectType()
export class SeasonModel {
  @Field(() => Int)
  number: number;

  @Field(() => [EpisodeModel])
  episodes: EpisodeModel[];

  // releaseDate
  @Field((type) => ReleaseDateModel)
  releaseDate: ReleaseDateModel;
}
