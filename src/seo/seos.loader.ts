import * as DataLoader from 'dataloader';
import { ImageService } from '../image/image.service';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export default class SeosLoader {
  constructor(private readonly imageService: ImageService) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByIds(ids);
    return ids.map((id) => res.find((image) => image.id === id));
  });
}
