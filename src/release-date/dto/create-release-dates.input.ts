import { Field, InputType } from '@nestjs/graphql';
import { CreateReleaseDateInput } from './create-release-date.input';

@InputType()
export class CreateReleaseDatesInput {
  @Field(() => [CreateReleaseDateInput])
  items: CreateReleaseDateInput[];
}
