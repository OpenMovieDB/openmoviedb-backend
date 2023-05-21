import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ImageAssetModel } from './image-asset.model';
import { ImageModel } from './image.model';

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
export class ImageLinkModel extends BaseModel {
  @Field((type) => ImageType)
  type: ImageType;

  @Field((type) => ImageModel)
  image: ImageModel;
}
