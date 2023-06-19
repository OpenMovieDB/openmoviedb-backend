import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReleaseDateModel } from 'src/domains/release-date/models/release-date.model';
import { EpisodeModel } from './episode.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class SeasonModel extends BaseModel {
  @Field()
  movieId?: string;

  @Field(() => Int)
  number: number;

  @Field(() => [EpisodeModel], { nullable: 'itemsAndList' })
  episodes?: EpisodeModel[];

  @Field((type) => ReleaseDateModel, { nullable: true })
  releaseDate?: ReleaseDateModel;
}
