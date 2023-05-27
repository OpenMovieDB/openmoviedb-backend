import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../common/models/base.model';
import { SeoModel } from '../seo/seo.model';

@ObjectType({ isAbstract: true })
export abstract class PageInfoModel extends BaseModel {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [SeoModel], { nullable: 'itemsAndList' })
  seo?: SeoModel[];
}
