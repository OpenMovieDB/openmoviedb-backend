import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { SeoModel } from './seo.model';

@ObjectType({ isAbstract: true })
export abstract class PageInfoModel extends BaseModel {
  @Field()
  title: string;

  @Field()
  description: string;

  //seo
  @Field((type) => [SeoModel])
  seo: SeoModel[];
}
