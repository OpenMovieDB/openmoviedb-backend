import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { BlockService } from 'src/domains/block/block.service';
import { PageInfoService } from 'src/domains/page-info/page-info.service';

@Injectable({ scope: Scope.REQUEST })
export default class PagesLoader {
  constructor(private readonly pageInfoService: PageInfoService, private readonly blockService: BlockService) {}

  public readonly batchPageInfo = new DataLoader(async (ids: string[]) => {
    const res = await this.pageInfoService.findManyByIds(ids);
    return ids.map((id) => res.find((item) => item.id === id));
  });

  public readonly batchBlocks = new DataLoader(async (ids: string[]) => {
    const res = await this.blockService.getBlocksByPageIds(ids);
    return ids.map((id) => res.find((item) => item.id === id));
  });
}
