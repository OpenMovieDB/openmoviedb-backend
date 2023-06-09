import { Field, InputType } from '@nestjs/graphql';
import { AbstractTypeFilterInput } from './abstract-type-filter.input';

@InputType('BooleanFilterInput')
export class BooleanFilterInput extends AbstractTypeFilterInput(Boolean) {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean;

  @Field(() => BooleanFilterInput, { nullable: true })
  not?: BooleanFilterInput;
}
