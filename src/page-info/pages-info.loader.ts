import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { SeoService } from '../seo/seo.service';

@Injectable({ scope: Scope.REQUEST })
export default class PagesInfoLoader {
  constructor(private readonly seoService: SeoService) {}

  public readonly batchSeo = new DataLoader(async (ids: string[]) => {
    const res = await this.seoService.findManyByPageInfoIds(ids);
    return ids.map((id) => res.filter((seo) => seo.pageInfoId === id));
  });
}
