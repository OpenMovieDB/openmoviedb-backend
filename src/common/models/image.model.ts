import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

enum ImageType {
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

enum ImageAssetFormat {
  AVIF,
  GIF,
  JPEG,
  PNG,
  WEBP,
}

enum ImageAssetWidth {
  W375,
  W768,
  W1024,
  W1280,
  W1366,
  W1600,
  W1920,
  W2560,
}

registerEnumType(ImageType, {
  name: 'ImageType',
  description: 'Type of the image',
});

registerEnumType(ImageAssetFormat, {
  name: 'ImageAssetFormat',
  description: 'Format of the image asset',
});

registerEnumType(ImageAssetWidth, {
  name: 'ImageAssetWidth',
  description: 'Width of the image asset',
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

@ObjectType()
export class ImageAssetModel extends BaseModel {
  @Field((type) => ImageAssetFormat)
  format: ImageAssetFormat;

  @Field((type) => ImageAssetWidth)
  width: ImageAssetWidth;

  @Field()
  url: string;

  @Field((type) => Image)
  image: ImageModel;
}
