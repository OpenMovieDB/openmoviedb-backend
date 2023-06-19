import { Field, InputType } from '@nestjs/graphql';
import { CreateSeoInput } from './create-seo-input';

@InputType()
export class CreateManySeoInput {
  @Field(() => [CreateSeoInput], { nullable: false })
  items: CreateSeoInput[];
}
