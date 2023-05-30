import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../common/models/base-page.model';
import { ImageModel } from '../../image/models/image.model';
import { BlockModel } from '../../block/models/block.model';
import { MovieModel } from '../../movie/models/movie.model';
import { ImageLinkModel } from 'src/image/models/image-link.model';

@ObjectType()
export class CollectionModel extends BasePageModel {
  @Field((type) => [ImageModel])
  images: ImageLinkModel[];

  @Field((type) => [MovieModel])
  movies: MovieModel[];

  @Field((type) => BlockModel, { nullable: true })
  block?: BlockModel;
}
