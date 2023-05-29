import { Field, InputType } from '@nestjs/graphql';
import { AbstractTypeFilterInput } from './abstract-type-filter.input';

@InputType('StringFilterInput')
export class StringFilterInput extends AbstractTypeFilterInput(String) {
  @Field(() => String, { nullable: true })
  contains?: string;

  @Field(() => StringFilterInput, { nullable: true })
  not?: StringFilterInput;
}
