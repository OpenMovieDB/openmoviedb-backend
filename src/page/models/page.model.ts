import { Field, ObjectType } from '@nestjs/graphql';
import { BasePageModel } from '../../common/models/base-page.model';
import { Block } from 'ts-morph';
import { BlockModel } from '../../block/models/block.model';

@ObjectType()
export class PageModel extends BasePageModel {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field((type) => [Block])
  blocks: BlockModel[];

  @Field((_type) => Boolean)
  isPublished: boolean;
}
