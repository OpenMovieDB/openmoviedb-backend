import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import { ImageModel } from '../../common/models/image.model';
import { SliderModel } from '../../slider/models/slider.model';
import { BaseModel } from '../../common/models/base.model';
import { CollectionModel } from '../../collection/models/collection.model';

export enum BlockType {
  TEXT,
  IMAGE,
  VIDEO,
  MOVIE_COLLECTION,
  SLIDER,
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
