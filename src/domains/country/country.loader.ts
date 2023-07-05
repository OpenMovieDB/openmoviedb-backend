import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ImageService } from '../image/image.service';

@Injectable({ scope: Scope.REQUEST })
export default class CountryLoader {
  constructor(private readonly imageService: ImageService) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByCountryIds(ids);
    return ids.map((id) => res.filter((image) => image.countryId === id));
  });
}
