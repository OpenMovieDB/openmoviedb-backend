import { Field, InputType } from '@nestjs/graphql';
import { UpdateSeoInput } from './update-seo-input';

@InputType()
export class UpdateManySeoInput {
  @Field(() => [UpdateSeoInput], { nullable: false })
  items: UpdateSeoInput[];
}
