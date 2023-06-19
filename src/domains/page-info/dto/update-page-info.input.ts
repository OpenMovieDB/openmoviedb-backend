import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePageInfoInput {
  @Field(() => String, {
    nullable: false,
  })
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
