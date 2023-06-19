import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCountryInput {
  @Field()
  slug: string;

  @Field()
  title: string;
}
