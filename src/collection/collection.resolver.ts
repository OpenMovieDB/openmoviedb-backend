import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CollectionModel } from './models/collection.model';
import { BlockModel } from 'src/block/models/block.model';
import { PageInfoModel } from 'src/page-info/models/page-info.model';
import CollectionsLoader from './collection.loader';
import { ImageLinkModel } from 'src/image/models/image-link.model';

@Resolver(() => CollectionModel)
export class CollectionResolver {
  constructor(private readonly collectionsLoader: CollectionsLoader) {}

  @ResolveField('pageInfo', () => PageInfoModel, { nullable: true })
  async collectionPageInfo(@Parent() collection: CollectionModel): Promise<PageInfoModel> {
    return this.collectionsLoader.batchPageInfo.load(collection.pageInfoId);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async collectionImages(@Parent() collection: CollectionModel): Promise<ImageLinkModel[]> {
    return this.collectionsLoader.batchImages.load(collection.id);
  }

  @ResolveField('block', () => BlockModel, { nullable: true })
  async collectionBlock(@Parent() collection: CollectionModel): Promise<BlockModel> {
    return this.collectionsLoader.batchBlock.load(collection.blockId);
  }
}
