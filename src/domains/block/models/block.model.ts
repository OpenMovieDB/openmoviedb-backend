import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ImageModel } from '../../image/models/image.model';
import { SliderModel } from '../../slider/models/slider.model';
import { BaseModel } from '../../../common/models/base.model';
import { CollectionModel } from '../../collection/models/collection.model';

export enum BlockType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  MOVIE_COLLECTION = 'MOVIE_COLLECTION',
  SLIDER = 'SLIDER',
}

registerEnumType(BlockType, {
  name: 'BlockType',
  description: 'Type of the block',
});

@ObjectType()
export class BlockModel extends BaseModel {
  @Field((type) => BlockType)
  blockType: BlockType;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => Int)
  order: number;

  @Field((type) => [CollectionModel], { nullable: true })
  collections?: CollectionModel[];

  @Field((type) => [SliderModel], { nullable: true })
  sliders?: SliderModel[];

  @Field((type) => [ImageModel], { nullable: true })
  images?: ImageModel[];
}
