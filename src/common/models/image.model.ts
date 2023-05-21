import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ImageAssetModel } from './image-asset.model';

@ObjectType()
export class ImageModel extends BaseModel {
  @Field()
  height: number;

  @Field()
  width: number;

  @Field((type) => [ImageAssetModel], { nullable: 'itemsAndList' })
  assets?: ImageAssetModel[];
}
