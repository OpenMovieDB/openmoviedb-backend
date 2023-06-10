import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BlockModel } from './models/block.model';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import BlocksLoader from './block.loader';

@Resolver(() => BlockModel)
export class BlockResolver {
  constructor(private readonly blocksLoader: BlocksLoader) {}

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async blockImages(@Parent() movie: BlockModel): Promise<ImageLinkModel[]> {
    return this.blocksLoader.batchImages.load(movie.id);
  }
}
