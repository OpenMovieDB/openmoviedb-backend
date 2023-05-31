import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateExternalIdInput } from './create-external-id.input';

@InputType()
export class CreateExternalIdsInput {
  @Field(() => [CreateExternalIdInput])
  ids: CreateExternalIdInput[];
}
