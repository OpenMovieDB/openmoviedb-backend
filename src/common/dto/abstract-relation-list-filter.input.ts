import { InputType, Field } from '@nestjs/graphql';

export function AbstractRelationListFilterInput<T>(TClass: new () => T): any {
  @InputType({ isAbstract: true })
  abstract class AbstractRelationInput {
    @Field(() => TClass, { nullable: true })
    abstract every?: T;

    @Field(() => TClass, { nullable: true })
    abstract some?: T;

    @Field(() => TClass, { nullable: true })
    abstract none?: T;
  }

  return AbstractRelationInput;
}
