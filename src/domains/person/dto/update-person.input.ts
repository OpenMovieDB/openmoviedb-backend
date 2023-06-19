import { Field, InputType } from '@nestjs/graphql';
import { CreatePersonInput } from './create-person.input';

@InputType()
export class UpdatePersonInput extends CreatePersonInput {
  @Field(() => String, { nullable: false })
  id!: string;
}
