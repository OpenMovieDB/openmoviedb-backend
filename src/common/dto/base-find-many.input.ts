import { Field, InputType } from '@nestjs/graphql';
import { UuidFilterInput } from './uuid-filter.input';
import { DateFilterInput } from './date-filter.input';

@InputType({ isAbstract: true })
export abstract class BaseFindManyInput {
  @Field({ nullable: true })
  id?: UuidFilterInput;

  @Field({ nullable: true })
  createdAt?: DateFilterInput;

  @Field({ nullable: true })
  updatedAt?: DateFilterInput;
}
