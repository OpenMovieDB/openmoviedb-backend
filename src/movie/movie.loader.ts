import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ExternalIdService } from 'src/external-id/external-id.service';
import { MediaService } from 'src/media/media.service';

@Injectable({ scope: Scope.REQUEST })
export default class MoviesLoader {
  constructor(private readonly externalIdService: ExternalIdService, private readonly mediaService: MediaService) {}

  public readonly batchExternalIds = new DataLoader(async (ids: string[]) => {
    const res = await this.externalIdService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((externalId) => externalId.movieId === id));
  });

  public readonly batchMedias = new DataLoader(async (ids: string[]) => {
    const res = await this.mediaService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((externalId) => externalId.movieId === id));
  });
}
