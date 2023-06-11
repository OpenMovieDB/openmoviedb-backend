import { Field, InputType } from '@nestjs/graphql';
import { UuidFilterInput } from '../../common/dto/uuid-filter.input';

@InputType()
export class FindFactsInput {
  @Field((type) => UuidFilterInput)
  id: UuidFilterInput;
}
