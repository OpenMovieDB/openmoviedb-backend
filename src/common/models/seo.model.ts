import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ImageModel } from '../../image/models/image.model';

enum SeoType {
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

  @Field((type) => ImageModel, { nullable: true })
  image?: ImageModel | null;

  @Field((type) => SeoType)
  type: SeoType;
}
