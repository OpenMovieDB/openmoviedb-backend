import { Field, InputType } from '@nestjs/graphql';
import { AbstractTypeFilterInput } from './abstract-type-filter.input';

export function AbstractNumberLikeFilterInput<T>(TClass: new () => T): any {
  @InputType({ isAbstract: true })
  abstract class AbstractNumberLikeInputClass extends AbstractTypeFilterInput(TClass) {
    @Field(() => TClass, { nullable: true })
    abstract lt?: T;

    @Field(() => TClass, { nullable: true })
    abstract lte?: T;

    @Field(() => TClass, { nullable: true })
    abstract gt?: T;

    @Field(() => TClass, { nullable: true })
    abstract gte?: T;
  }

  return AbstractNumberLikeInputClass;
}
