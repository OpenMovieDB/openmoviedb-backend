import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../../common/models/base-page.model';
import { ImageLinkModel } from '../../image/models/image-link.model';

@ObjectType()
export class GenreModel extends BasePageModel {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field((type) => [ImageLinkModel], { nullable: 'itemsAndList' })
  images?: ImageLinkModel[];
}
