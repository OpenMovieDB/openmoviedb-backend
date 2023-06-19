import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ImageLinkModel } from 'src/domains/image/models/image-link.model';
import BlocksLoader from './block.loader';
import { BlockService } from './block.service';
import { CreateBlockInput } from './dto/create-block.input';
import { BlocksModel } from './models/blocks.model';
import { BlockModel } from './models/block.model';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { FindBlocksInput } from './dto/find-blocks.input';
import { UpdateBlockInput } from './dto/update-block.input';

@Resolver(() => BlockModel)
export class BlockResolver extends BaseResolver(
  'Block',
  BlockModel,
  BlocksModel,
  FindBlocksInput,
  CreateBlockInput,
  UpdateBlockInput,
  BlockService,
) {
  constructor(private readonly blockService: BlockService, private readonly blocksLoader: BlocksLoader) {
    super(blockService);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async blockImages(@Parent() block: BlockModel): Promise<ImageLinkModel[]> {
    return this.blocksLoader.batchImages.load(block.id);
  }
}
