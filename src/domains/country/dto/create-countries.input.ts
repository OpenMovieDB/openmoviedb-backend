import { InputType, Field } from '@nestjs/graphql';
import { CreateCountryInput } from './create-country.input';

@InputType()
export class CreateCountriesInput {
  @Field(() => [CreateCountryInput])
  items: CreateCountryInput[];
}
