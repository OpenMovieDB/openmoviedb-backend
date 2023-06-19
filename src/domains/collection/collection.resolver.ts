import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CollectionModel } from './models/collection.model';
import { FindCollectionsInput } from './dto/find-collections.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { ImageLinkModel } from '../image/models/image-link.model';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import CollectionsLoader from './collection.loader';
import { CollectionsModel } from './models/collections.model';
import { CollectionService } from './collection.service';
import { PageInfoModel } from '../page-info/models/page-info.model';
import { BlockModel } from '../block/models/block.model';
import { CreateCollectionInput } from './dto/create-collection.input';

@Resolver(() => CollectionModel)
export class CollectionResolver extends BaseResolver(
  'Collection',
  CollectionModel,
  CollectionsModel,
  FindCollectionsInput,
  CreateCollectionInput,
  UpdateCollectionInput,
  CollectionService,
) {
  constructor(
    private readonly collectionsLoader: CollectionsLoader,
    private readonly collectionService: CollectionService,
  ) {
    super(collectionService);
  }

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
