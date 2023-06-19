import { Field, InputType } from '@nestjs/graphql';
import { UuidFilterInput } from 'src/common/dto/uuid-filter.input';

@InputType()
export class FindSlidersInput {
  @Field(() => UuidFilterInput, { nullable: true })
  id?: UuidFilterInput;
}
