import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { ImageModel } from 'src/common/models/image.model';
import { MediaAssetModel } from './media-asset.model';

enum MediaSource {
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

  @Field((type) => ImageModel, { nullable: true })
  image?: ImageModel;

  @Field((type) => MediaSource)
  source: MediaSource;

  // Assets
  @Field((type) => [MediaAssetModel])
  assets: MediaAssetModel[];
}
