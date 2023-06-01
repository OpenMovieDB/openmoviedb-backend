import { Field, InputType } from '@nestjs/graphql';
import { SeoType } from '../models/seo-type.enum';

@InputType()
export class CreateSeoInput {
  @Field((type) => String, { nullable: false })
  pageInfoId!: string;

  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field((type) => SeoType, { nullable: true })
  type!: SeoType;
}
