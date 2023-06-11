import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ImageLinkModel } from '../image/models/image-link.model';
import { CollectionModel } from './models/collection.model';
import CollectionsLoader from './collection.loader';
import { CollectionsModel } from './models/collections.model';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { CollectionService } from './collection.service';
import { FindCollectionsInput } from './dto/find-collections.input';
import { PageInfoModel } from '../page-info/models/page-info.model';
import { BlockModel } from '../block/models/block.model';
import { CreateCollectionInput } from './dto/create-collection.input';

@Resolver(() => CollectionModel)
export class CollectionResolver {
  constructor(
    private readonly collectionsLoader: CollectionsLoader,
    private readonly collectionService: CollectionService,
  ) {}

  @Query(() => CollectionModel)
  async collection(@Args('id') id: string): Promise<CollectionModel> {
    return this.collectionService.findOne(id);
  }

  @Query(() => CollectionsModel)
  async collections(
    @Args() pagination: PaginationArgs,
    @Args('data') dto: FindCollectionsInput,
  ): Promise<CollectionsModel> {
    return this.collectionService.findMany(pagination, dto);
  }

  @Mutation(() => CollectionModel)
  async createCollection(@Args('data') dto: CreateCollectionInput): Promise<CollectionModel> {
    return this.collectionService.create(dto);
  }

  @Mutation(() => CollectionModel)
  async updateCollection(@Args('id') id: string, @Args('data') dto: CreateCollectionInput): Promise<CollectionModel> {
    return this.collectionService.update(id, dto);
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
