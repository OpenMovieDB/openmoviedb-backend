import { Field, InputType } from '@nestjs/graphql';
import { AbstractTypeFilterInput } from './abstract-type-filter.input';
import { AbstractNumberLikeFilterInput } from './abstract-number-like-filter.input';

@InputType('NumberFilterInput')
export class NumberFilterInput extends AbstractNumberLikeFilterInput(Number) {
  @Field(() => Number, { nullable: true })
  contains?: number;

  @Field(() => NumberFilterInput, { nullable: true })
  not?: NumberFilterInput;
}
