import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { MovieService } from '../movie/movie.service';
import { ImageService } from '../image/image.service';

@Injectable({ scope: Scope.REQUEST })
export default class SlidesLoader {
  constructor(
    private readonly imageService: ImageService,
    private readonly movieService: MovieService,
  ) {}

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((image) => image.movieId === id));
  });

  public readonly batchMovies = new DataLoader(async (ids: string[]) => {
    const res = await this.movieService.findManyByIds(ids);
    return ids.map((id) => res.find((movie) => movie.id === id));
  });
}
