import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KinopoiskDev, MovieQueryBuilder, SORT_TYPE } from '@openmoviedb/kinopoiskdev_client';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private readonly MOVIES_LIMIT = 250;
  private kp: KinopoiskDev;

  constructor(private readonly configService: ConfigService) {
    this.kp = new KinopoiskDev(this.configService.get('KP_API_KEY'));

    this.syncMovies();
  }

  async syncMovies() {
    const year = new Date().getFullYear();
    const res = await this.getMoviesByYears(year);
    if (res.error) {
      this.logger.error(res.error);
      throw new Error(res.error);
    }

    const { pages } = res.data;

    for (let i = 1; i <= pages; i++) {
      const res = await this.getMoviesByYears(year, i);
      if (res.error) {
        this.logger.error(res.error);
        throw new Error(res.error);
      }

      const { data } = res;
      for (const movie of data.docs) {
        this.logger.log(movie.name);
      }
    }
  }

  async getMoviesByYears(year: number, page: number = 1) {
    const qb = new MovieQueryBuilder();
    const query = qb
      .select([
        'id',
        'name',
        'enName',
        'type',
        'isSeries',
        'names',
        'year',
        'audience',
        'poster',
        'backdrop',
        'externalId',
        'facts',
        'rating',
        'persons',
        'releaseYears',
        'genres',
        'countries',
      ] as any)
      .sort('id', SORT_TYPE.DESC)
      .filterExact('year', year)
      .paginate(page, this.MOVIES_LIMIT)
      .build();
    return this.kp.movie.getByFilters(query);
  }
}
