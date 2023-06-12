import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSlideInput {
  @Field()
  title: string;
}
