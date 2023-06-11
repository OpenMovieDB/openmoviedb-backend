import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field()
  title: string;
}
