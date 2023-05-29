import { Field, InputType } from '@nestjs/graphql';

export function AbstractEnumFilterInput<T extends object>(enumObject: T): any {
  @InputType({ isAbstract: true })
  abstract class AbstractTypeInputClass {
    //@ts-ignore
    @Field(() => enumObject, { nullable: true })
    abstract equals?: T;

    //@ts-ignore
    @Field(() => [enumObject], { nullable: true })
    abstract in?: T[];

    //@ts-ignore
    @Field(() => [enumObject], { nullable: true })
    abstract notIn?: T[];
  }

  return AbstractTypeInputClass;
}
