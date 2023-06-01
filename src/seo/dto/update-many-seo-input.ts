import { Field, InputType } from '@nestjs/graphql';
import { CreateSeoInput } from './create-seo-input';
import { CreateManySeoInput } from './create-many-seo-input';
import { UpdateSeoInput } from './update-seo-input';

@InputType()
export class UpdateManySeoInput {
  @Field(() => [UpdateSeoInput], { nullable: false })
  items: UpdateSeoInput[];
}
