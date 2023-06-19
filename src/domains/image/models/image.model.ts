import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../common/models/base.model';
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
