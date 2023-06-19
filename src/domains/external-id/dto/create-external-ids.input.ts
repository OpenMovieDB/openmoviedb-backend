import { Field, InputType } from '@nestjs/graphql';
import { CreateExternalIDInput } from './create-external-id.input';

@InputType()
export class CreateExternalIDsInput {
  @Field(() => [CreateExternalIDInput])
  ids: CreateExternalIDInput[];
}
