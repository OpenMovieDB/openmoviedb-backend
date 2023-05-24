import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { ImageModel } from '../../image/models/image.model';
import { MovieModel } from '../../movie/models/movie.model';

@ObjectType()
export class SlideModel extends BaseModel {
  @Field()
  title: string;

  @Field(() => Int)
  position: number;

  @Field()
  description: string;

  @Field(() => [ImageModel])
  images: ImageModel[];

  @Field(() => MovieModel)
  movie: MovieModel;
}
