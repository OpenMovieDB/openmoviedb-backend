import { Field, InputType } from '@nestjs/graphql';
import { CreateFactInput } from './create-fact.input';

@InputType()
export class CreateFactsInput {
  @Field(() => [CreateFactInput])
  items: CreateFactInput[];
}
