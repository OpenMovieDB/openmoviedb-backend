import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEpisodeInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field({ nullable: true })
  number?: number;

  @Field({ nullable: true })
  title?: string;
}
