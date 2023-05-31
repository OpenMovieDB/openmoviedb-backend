import { Field } from '@nestjs/graphql';

export class CreateFactInput {
  @Field()
  movieId: string;

  @Field()
  content: string;

  @Field()
  isSpoiler: boolean;
}
