import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { MediaModel } from './media.model';

export enum MediaType {
  TRAILER,
  TEASER,
  BACKDROP,
  VIDEO,
  AUDIO,
}

registerEnumType(MediaType, {
  name: 'MediaType',
  description: 'Type of the media',
});

@ObjectType()
export class MediaLinkModel extends BaseModel {
  @Field()
  movieId?: string;

  @Field((type) => MediaType)
  type: MediaType;

  @Field((type) => MediaModel)
  media: MediaModel;
}
