import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSeasonInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field({ nullable: true })
  number?: number;
}
