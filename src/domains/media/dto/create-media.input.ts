import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMediaInput {
  @Field()
  title: string;
}
