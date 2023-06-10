import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ImageService } from 'src/image/image.service';

@Injectable({ scope: Scope.REQUEST })
export default class BlocksLoader {
  constructor(private readonly imageService: ImageService) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByBlockIds(ids);
    return ids.map((id) => res.filter((image) => image.movieId === id));
  });
}
