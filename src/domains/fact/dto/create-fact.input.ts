import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFactInput {
  @Field()
  movieId: string;

  @Field()
  content: string;

  @Field()
  isSpoiler: boolean;
}
