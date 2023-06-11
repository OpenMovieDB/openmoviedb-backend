import { Field, InputType } from '@nestjs/graphql';
import { UuidFilterInput } from '../../common/dto/uuid-filter.input';

@InputType()
export class FindExternalIDsInput {
  @Field((type) => UuidFilterInput)
  id: UuidFilterInput;
}
