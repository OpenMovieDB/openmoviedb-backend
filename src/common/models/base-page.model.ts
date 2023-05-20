import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { SeoModel } from './seo.model';
import { PageInfoModel } from './page-info.model';

@ObjectType({ isAbstract: true })
export abstract class BasePageModel extends BaseModel {
  @Field((type) => PageInfoModel)
  pageInfo: PageInfoModel;

  @Field((type) => [SeoModel])
  seo: SeoModel[];
}
