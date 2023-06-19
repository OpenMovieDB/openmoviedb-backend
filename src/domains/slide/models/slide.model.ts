import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../common/models/base.model';
import { ImageModel } from '../../image/models/image.model';
import { MovieModel } from '../../movie/models/movie.model';

@ObjectType()
export class SlideModel extends BaseModel {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [ImageModel], { nullable: true })
  images?: ImageModel[];

  @Field(() => MovieModel, { nullable: true })
  movie?: MovieModel;
}
