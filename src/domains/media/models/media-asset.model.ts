import { Field, ObjectType, registerEnumType, Float } from '@nestjs/graphql';
import e from 'express';
import { BaseModel } from 'src/common/models/base.model';

export enum MediaFormat {
  MP4,
  WEBM,
  OGG,
  MKV,
  MP3,
  WAV,
}

registerEnumType(MediaFormat, {
  name: 'MediaFormat',
  description: 'Format of the media',
});

@ObjectType()
export class MediaAssetModel extends BaseModel {
  @Field()
  url: string;

  @Field((type) => Float)
  duration: number;

  @Field((type) => MediaFormat)
  format: MediaFormat;
}
