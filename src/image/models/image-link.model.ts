import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { ImageModel } from './image.model';

export enum ImageType {
  POSTER = 'POSTER',
  BACKDROP = 'BACKDROP',
  LOGO = 'LOGO',
  PHOTO = 'PHOTO',
  STILL = 'STILL',
  SHOOTING = 'SHOOTING',
  ICON = 'ICON',
  PROFILE = 'PROFILE',
  SEO = 'SEO',
  HERO = 'HERO',
}

registerEnumType(ImageType, {
  name: 'ImageType',
  description: 'Type of the image',
});

@ObjectType()
export class ImageLinkModel extends BaseModel {
  @Field({ nullable: true })
  movieId?: string;

  @Field({ nullable: true })
  genreId?: string;

  @Field({ nullable: true })
  countryId?: string;

  @Field((type) => ImageType)
  type: ImageType;

  @Field((type) => ImageModel)
  image: ImageModel;
}
