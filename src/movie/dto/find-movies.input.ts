import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindMoviesInput {
  @Field({ nullable: true })
  title?: string;
}
