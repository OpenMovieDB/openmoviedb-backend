import { Field, InputType } from '@nestjs/graphql';
import { BooleanFilterInput } from 'src/common/dto/boolean-filter.input';
import { BaseFindManyInput } from '../../../common/dto/base-find-many.input';

@InputType()
export class FindPagesInput extends BaseFindManyInput {
  @Field(() => BooleanFilterInput)
  isPublished: BooleanFilterInput;
}
