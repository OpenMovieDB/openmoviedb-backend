import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSliderInput {
  @Field()
  title: string;
}
