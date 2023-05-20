import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../common/models/base-page.model';
import { ImageModel } from '../../common/models/image.model';
import { BlockModel } from '../../block/models/block.model';
import { MovieModel } from '../../movie/models/movie.model';

@ObjectType()
export class CollectionModel extends BasePageModel {
  @Field((type) => [ImageModel])
  images: ImageModel[];

  @Field((type) => [MovieModel])
  movies: MovieModel[];

  @Field((type) => BlockModel, { nullable: true })
  block?: BlockModel;
}
