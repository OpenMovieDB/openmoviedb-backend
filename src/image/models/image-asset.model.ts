import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

export enum ImageAssetFormat {
  AVI = 'AVIF',
  GIF = 'GIF',
  JPEG = 'JPEG',
  PNG = 'PNG',
  WEBP = 'WEBP',
}

export enum ImageAssetWidth {
  W375 = 'W375',
  W768 = 'W768',
  W1024 = 'W1024',
  W1280 = 'W1280',
  W1366 = 'W1366',
  W1600 = 'W1600',
  W1920 = 'W1920',
  W2560 = 'W2560',
}

registerEnumType(ImageAssetFormat, {
  name: 'ImageAssetFormat',
  description: 'Format of the image asset',
});

registerEnumType(ImageAssetWidth, {
  name: 'ImageAssetWidth',
  description: 'Width of the image asset',
});

@ObjectType()
export class ImageAssetModel extends BaseModel {
  @Field((type) => ImageAssetFormat)
  format: ImageAssetFormat;

  @Field((type) => ImageAssetWidth)
  width: ImageAssetWidth;

  @Field()
  url: string;
}
