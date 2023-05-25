import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../common/models/base-page.model';
import { MovieModel } from '../../movie/models/movie.model';
import { ImageLinkModel } from 'src/image/models/image-link.model';

@ObjectType()
export class GenreModel extends BasePageModel {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field((type) => [ImageLinkModel], { nullable: 'itemsAndList' })
  images?: ImageLinkModel[];

  @Field((type) => [MovieModel], { nullable: 'itemsAndList' })
  movies?: MovieModel[];
}
