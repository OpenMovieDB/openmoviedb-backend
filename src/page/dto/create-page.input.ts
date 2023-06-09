import { Field } from '@nestjs/graphql';

export class CreatePageInput {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field((_type) => Boolean)
  isPublished: boolean;
}
