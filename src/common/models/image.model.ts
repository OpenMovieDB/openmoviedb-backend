import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ImageAssetModel } from './image-asset.model';

export enum ImageType {
  POSTER,
  BACKDROP,
  LOGO,
  PHOTO,
  STILL,
  SHOOTING,
  ICON,
  PROFILE,
  SEO,
  HERO,
}

registerEnumType(ImageType, {
  name: 'ImageType',
  description: 'Type of the image',
});

@ObjectType()
export class ImageModel extends BaseModel {
  @Field((type) => ImageType)
  type: ImageType;

  @Field()
  height: number;

  @Field()
  width: number;

  @Field((type) => [ImageAssetModel], { nullable: 'itemsAndList' })
  assets?: ImageAssetModel[];
}
