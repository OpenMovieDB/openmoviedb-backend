import { Field, InputType } from '@nestjs/graphql';
import { UuidFilterInput } from '../../../common/dto/uuid-filter.input';

@InputType()
export class FindSlidesInput {
  @Field(() => UuidFilterInput, { nullable: true })
  id?: UuidFilterInput;
}
