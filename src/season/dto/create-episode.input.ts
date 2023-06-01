import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateEpisodeInput {
  @Field(() => Int)
  number: number;

  @Field()
  title: string;
}
