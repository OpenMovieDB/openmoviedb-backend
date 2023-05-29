import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindGenresInput {
  @Field({ nullable: true })
  title?: string;
}
