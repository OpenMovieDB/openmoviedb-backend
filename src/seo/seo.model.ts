import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../common/models/base.model';
import { ImageModel } from '../image/models/image.model';
import { ImageLinkModel } from 'src/image/models/image-link.model';

export enum SeoType {
  OPEN_GRAPH,
  TWITTER_CARD,
  JSONLD,
  BASIC,
}

registerEnumType(SeoType, {
  name: 'SeoType',
  description: 'Type of SEO',
});

@ObjectType()
export class SeoModel extends BaseModel {
  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field((type) => ImageLinkModel, { nullable: true })
  image?: ImageLinkModel | null;

  @Field((type) => SeoType)
  type: SeoType;
}
