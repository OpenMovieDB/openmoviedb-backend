import { Field, InputType } from '@nestjs/graphql';
import { CreateSeasonInput } from './create-season.input';

@InputType()
export class CreateSeasonsInput {
  @Field(() => [CreateSeasonInput])
  items: CreateSeasonInput[];
}
