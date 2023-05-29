import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindCountriesInput {
  @Field({ nullable: true })
  title?: string;
}
