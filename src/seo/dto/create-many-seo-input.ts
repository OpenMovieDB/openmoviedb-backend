import { Field, InputType } from '@nestjs/graphql';
import { SeoType } from '../models/seo-type.enum';
import { CreateSeoInput } from './create-seo-input';

@InputType()
export class CreateManySeoInput {
  @Field(() => [CreateSeoInput], { nullable: false })
  items: CreateSeoInput[];
}
