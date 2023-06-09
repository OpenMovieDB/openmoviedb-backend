import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PageInfoService } from 'src/page-info/page-info.service';

@Injectable({ scope: Scope.REQUEST })
export default class PagesLoader {
  constructor(private readonly pageInfoService: PageInfoService) {}

  public readonly batchPageInfo = new DataLoader(async (ids: string[]) => {
    const res = await this.pageInfoService.findManyByIds(ids);
    return ids.map((id) => res.find((pageInfo) => pageInfo.id === id));
  });
}
