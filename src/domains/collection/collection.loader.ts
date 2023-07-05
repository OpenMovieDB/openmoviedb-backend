import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PageInfoService } from '../page-info/page-info.service';
import { BlockService } from '../block/block.service';
import { ImageService } from '../image/image.service';

@Injectable({ scope: Scope.REQUEST })
export default class CollectionsLoader {
  constructor(
    private readonly pageInfoService: PageInfoService,
    private readonly imageService: ImageService,
    private readonly blockService: BlockService,
  ) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByCollectionIds(ids);
    return ids.map((id) => res.filter((image) => image.movieId === id));
  });

  public readonly batchPageInfo = new DataLoader(async (ids: string[]) => {
    const res = await this.pageInfoService.findManyByIds(ids);
    return ids.map((id) => res.find((item) => item.id === id));
  });

  public readonly batchBlock = new DataLoader(async (ids: string[]) => {
    const res = await this.blockService.getBlockByIds(ids);
    return ids.map((id) => res.find((item) => item.id === id));
  });
}
