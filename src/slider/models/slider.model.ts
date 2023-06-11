import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { BlockModel } from '../../block/models/block.model';
import { SlideModel } from 'src/slide/models/slide.model';

@ObjectType()
export class SliderModel extends BaseModel {
  @Field((type) => [SlideModel], { nullable: true })
  slides?: SlideModel[];

  @Field((type) => BlockModel, { nullable: true })
  block?: BlockModel;
}
