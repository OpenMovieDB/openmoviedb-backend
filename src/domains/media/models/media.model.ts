import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { MediaAssetModel } from './media-asset.model';
import { ImageLinkModel } from '../../image/models/image-link.model';
import { BaseModel } from '../../../common/models/base.model';

export enum MediaSource {
  YOUTUBE,
  VIMEO,
  S3,
}

registerEnumType(MediaSource, {
  name: 'MediaSource',
  description: 'Source of the media',
});

@ObjectType()
export class MediaModel extends BaseModel {
  @Field()
  title: string;

  @Field((type) => ImageLinkModel, { nullable: true })
  image?: ImageLinkModel;

  @Field((type) => MediaSource)
  source: MediaSource;

  // Assets
  @Field((type) => [MediaAssetModel])
  assets: MediaAssetModel[];
}
