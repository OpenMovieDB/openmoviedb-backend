import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KinopoiskDev, MovieQueryBuilder, SORT_TYPE } from '@openmoviedb/kinopoiskdev_client';

@Injectable()
export class SyncService {
  private readonly MOVIES_LIMIT = 250;
  private kp: KinopoiskDev;

  constructor(private readonly configService: ConfigService) {
    this.kp = new KinopoiskDev(this.configService.get('KP_API_KEY'));
  }

  async getMovies(page: number = 1) {
    const qb = new MovieQueryBuilder();
    const query = qb.sort('id', SORT_TYPE.DESC).paginate(page, this.MOVIES_LIMIT).build();
    return this.kp.movie.getByFilters(query);
  }
}
