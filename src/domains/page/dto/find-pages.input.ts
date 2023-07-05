import { Field, InputType } from '@nestjs/graphql';

import { BaseFindManyInput } from '../../../common/dto/base-find-many.input';
import { BooleanFilterInput } from '../../../common/dto/boolean-filter.input';

@InputType()
export class FindPagesInput extends BaseFindManyInput {
  @Field(() => BooleanFilterInput)
  isPublished: BooleanFilterInput;
}
