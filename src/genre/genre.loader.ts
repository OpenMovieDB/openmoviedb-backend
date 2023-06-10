import { Inject, Injectable, Scope, forwardRef } from '@nestjs/common';
// @ts-ignore
import * as DataLoader from 'dataloader';
import { ImageService } from 'src/image/image.service';

@Injectable({ scope: Scope.REQUEST })
export default class GenreLoader {
  constructor(private readonly imageService: ImageService) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByGenreIds(ids);
    return ids.map((id) => res.filter((image) => image.genreId === id));
  });
}
