import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../common/models/base-page.model';
import { ImageModel } from '../../common/models/image.model';
import { MovieModel } from '../../movie/models/movie.model';

@ObjectType()
export class GenreModel extends BasePageModel {
  @Field()
  title: string;

  @Field((type) => [ImageModel])
  images: ImageModel[];

  @Field((type) => [MovieModel])
  movies: MovieModel[];
}
