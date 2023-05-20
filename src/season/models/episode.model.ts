import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageModel } from '../../common/models/image.model';

@ObjectType()
export class EpisodeModel {
  @Field()
  id: string;

  @Field((type) => ImageModel, { nullable: true })
  image?: ImageModel;

  @Field((type) => Int)
  number: number;

  @Field()
  title: string;
}
