import { Field, InputType } from '@nestjs/graphql';

export function AbstractTypeFilterInput<T>(TClass: new () => T): any {
  @InputType({ isAbstract: true })
  abstract class AbstractTypeInputClass {
    @Field(() => TClass, { nullable: true })
    abstract equals?: T;

    @Field(() => [TClass], { nullable: true })
    abstract in?: T[];

    @Field(() => [TClass], { nullable: true })
    abstract notIn?: T[];
  }

  return AbstractTypeInputClass;
}
