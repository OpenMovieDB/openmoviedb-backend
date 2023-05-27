import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageModel } from '../../image/models/image.model';
import { BaseModel } from 'src/common/models/base.model';
import { ImageLinkModel } from 'src/image/models/image-link.model';

@ObjectType()
export class EpisodeModel extends BaseModel {
  @Field((type) => ImageModel, { nullable: true })
  image?: ImageLinkModel;

  @Field((type) => Int)
  number: number;

  @Field()
  title: string;
}
