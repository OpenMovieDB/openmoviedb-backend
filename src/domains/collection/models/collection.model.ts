import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../../common/models/base-page.model';
import { ImageModel } from '../../image/models/image.model';
import { BlockModel } from '../../block/models/block.model';
import { ImageLinkModel } from 'src/domains/image/models/image-link.model';

@ObjectType()
export class CollectionModel extends BasePageModel {
  @Field()
  title: string;

  @Field()
  blockId?: string;

  @Field((type) => [ImageModel], { nullable: true })
  images?: ImageLinkModel[];

  @Field((type) => BlockModel, { nullable: true })
  block?: BlockModel;
}
