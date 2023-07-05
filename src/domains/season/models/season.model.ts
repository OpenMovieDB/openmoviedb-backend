import { Field, Int, ObjectType } from '@nestjs/graphql';

import { EpisodeModel } from './episode.model';
import { BaseModel } from '../../../common/models/base.model';
import { ReleaseDateModel } from '../../release-date/models/release-date.model';

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
