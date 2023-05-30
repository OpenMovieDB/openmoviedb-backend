import { InputType, Field } from '@nestjs/graphql';

export function AbstractRelationFilterInput<T>(TClass: new () => T): any {
  @InputType({ isAbstract: true })
  abstract class AbstractRelationInput {
    @Field(() => TClass, { nullable: true })
    abstract is?: T;

    @Field(() => TClass, { nullable: true })
    abstract isNot?: T;
  }

  return AbstractRelationInput;
}
