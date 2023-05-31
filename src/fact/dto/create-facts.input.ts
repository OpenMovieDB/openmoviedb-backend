import { Field } from '@nestjs/graphql';
import { CreateFactInput } from './create-fact.input';

export class CreateFactsInput {
  @Field()
  items: CreateFactInput[];
}
