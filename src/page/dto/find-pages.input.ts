import { Field } from '@nestjs/graphql';
import { BooleanFilterInput } from 'src/common/dto/boolean-filter.input';

export class FindPagesInput {
  @Field(() => BooleanFilterInput)
  isPublished: BooleanFilterInput;
}
