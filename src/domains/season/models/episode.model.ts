import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageModel } from '../../image/models/image.model';
import { ImageLinkModel } from '../../image/models/image-link.model';
import { BaseModel } from '../../../common/models/base.model';

@ObjectType()
export class EpisodeModel extends BaseModel {
  @Field((type) => ImageModel, { nullable: true })
  image?: ImageLinkModel;

  @Field((type) => Int)
  number: number;

  @Field()
  title: string;
}
