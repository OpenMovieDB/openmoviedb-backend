import { Field, InputType } from '@nestjs/graphql';
import { BooleanFilterInput } from 'src/common/dto/boolean-filter.input';

@InputType()
export class FindPagesInput {
  @Field(() => BooleanFilterInput)
  isPublished: BooleanFilterInput;
}
