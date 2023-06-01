import { Field, InputType } from '@nestjs/graphql';
import { CreateEpisodeInput } from './create-episode.input';

@InputType()
export class CreateEpisodesInput {
  @Field(() => String, { nullable: false, description: 'Season ID' })
  seasonId!: string;

  @Field(() => [CreateEpisodeInput])
  items: CreateEpisodeInput[];
}
