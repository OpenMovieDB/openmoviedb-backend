import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field()
  slug: string;

  @Field()
  title: string;
}
