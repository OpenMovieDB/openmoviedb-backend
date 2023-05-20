import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { SlideModel } from './slide.model';
import { BlockModel } from '../../block/models/block.model';

@ObjectType()
export class SliderModel extends BaseModel {
  @Field((type) => [SlideModel])
  slides: SlideModel[];

  @Field((type) => BlockModel, { nullable: true })
  block?: BlockModel;
}
