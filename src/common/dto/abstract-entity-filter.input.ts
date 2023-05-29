import { Field, InputType } from '@nestjs/graphql';

export function AbstractEntityFilterInput<T>(TClass: new () => T): any {
  @InputType({ isAbstract: true })
  abstract class AbstractEntityInputClass {
    @Field(() => TClass, { nullable: true })
    every?: T;

    @Field(() => TClass, { nullable: true })
    some?: T;

    @Field(() => TClass, { nullable: true })
    none?: T;
  }

  return AbstractEntityInputClass;
}
