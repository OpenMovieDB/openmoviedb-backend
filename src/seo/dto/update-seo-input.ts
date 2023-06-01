import { Field, InputType, OmitType, PickType } from '@nestjs/graphql';
import { CreateSeoInput } from './create-seo-input';

@InputType()
export class UpdateSeoInput extends PickType(CreateSeoInput, ['title', 'description']) {
  @Field(() => String, { nullable: false })
  id!: string;
}
