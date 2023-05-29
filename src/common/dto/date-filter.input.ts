import { Field, InputType } from '@nestjs/graphql';
import { AbstractNumberLikeFilterInput } from './abstract-number-like-filter.input';

@InputType('DateFilterInput')
export class DateFilterInput extends AbstractNumberLikeFilterInput(Date) {
  @Field(() => Date, { nullable: true })
  contains?: Date;

  @Field(() => DateFilterInput, { nullable: true })
  not?: DateFilterInput;
}
