import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import BlocksLoader from './block.loader';
import { BlockService } from './block.service';

import { PaginationArgs } from '../common/pagination/pagination.args';
import { FindBlocksInput } from '../block/dto/find-blocks.input';
import { BlockModel } from './models/block.model';
import { BlocksModel } from './models/blocks.model';

@Resolver(() => BlockModel)
export class BlockResolver {
  constructor(private readonly blockService: BlockService, private readonly blocksLoader: BlocksLoader) {}

  @Query(() => BlockModel)
  async block(@Args('id') id: string): Promise<BlockModel> {
    return this.blockService.findOne(id);
  }

  @Query(() => BlocksModel)
  async blocks(@Args() pagination: PaginationArgs, @Args('data') dto: FindBlocksInput): Promise<BlocksModel> {
    return this.blockService.findMany(pagination, dto);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async blockImages(@Parent() block: BlockModel): Promise<ImageLinkModel[]> {
    return this.blocksLoader.batchImages.load(block.id);
  }
}
