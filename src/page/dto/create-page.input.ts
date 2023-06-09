import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePageInput {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field((_type) => Boolean)
  isPublished: boolean;
}
