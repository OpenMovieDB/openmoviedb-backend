import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../common/models/base.model';

import { SeoType } from './seo-type.enum';
import { ImageLinkModel } from '../../image/models/image-link.model';

@ObjectType()
export class SeoModel extends BaseModel {
  @Field()
  pageInfoId: string;

  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field((type) => ImageLinkModel, { nullable: true })
  image?: ImageLinkModel | null;

  @Field({ nullable: true })
  imageId?: string | null;

  @Field((type) => SeoType)
  type: SeoType;
}
