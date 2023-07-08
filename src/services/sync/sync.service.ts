import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KinopoiskDev, MovieQueryBuilder, SORT_TYPE, SPECIAL_VALUE } from '@openmoviedb/kinopoiskdev_client';
import { PrismaService } from 'nestjs-prisma';
import { KpMovieConverter } from 'src/services/sync/converters/kp-movie.converter';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private readonly MOVIES_LIMIT = 250;
  private kp: KinopoiskDev;

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly movieConverter: KpMovieConverter,
  ) {
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
      const newMovies = this.movieConverter.models2CreateMovies(data.docs);
      for (const newMovie of newMovies) {
        try {
          await this.prismaService.movie.create({
            data: newMovie,
          });
        } catch (e) {
          this.logger.error(`Error creating movie: ${newMovie.slug}`, e);
        }

        this.logger.log(`Movie ${newMovie.title} created`);
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
      ])
      .sort('id', SORT_TYPE.DESC)
      .filterExact('year', year)
      .filterExact('name', SPECIAL_VALUE.NOT_NULL)
      .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
      .paginate(page, this.MOVIES_LIMIT)
      .build();
    return this.kp.movie.getByFilters(query);
  }
}
