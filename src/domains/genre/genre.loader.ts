import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ImageService } from '../image/image.service';

@Injectable({ scope: Scope.REQUEST })
export default class GenreLoader {
  constructor(private readonly imageService: ImageService) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByGenreIds(ids);
    return ids.map((id) => res.filter((image) => image.genreId === id));
  });
}
