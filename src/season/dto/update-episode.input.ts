import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEpisodeInput {
  @Field({ nullable: true })
  number?: number;

  @Field({ nullable: true })
  title?: string;
}
