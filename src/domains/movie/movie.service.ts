import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MovieModel } from './models/movie.model';
import { MovieMapper } from './movie.mapper';
import { FindMoviesInput } from './dto/find-movies.input';
import { MoviesModel } from './models/movies.model';
import { CreateMovieInput } from './dto/create-movie.input';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class MovieService extends BaseService(
  'movie',
  MovieModel,
  MovieModel,
  MoviesModel,
  FindMoviesInput,
  CreateMovieInput,
  MovieMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async findManyByIds(ids: string[]): Promise<MovieModel[]> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return movies.map((movie) => new MovieMapper().mapEntityToModel(movie));
  }
}
