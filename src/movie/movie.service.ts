import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MovieModel } from './models/movie.model';
import { MovieMapper } from './movie.mapper';
import { FindMoviesInput } from './dto/find-movies.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { MoviesModel } from './models/movies.model';
import { CreateMovieInput } from './dto/create-movie.input';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<MovieModel> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
    });

    return new MovieMapper().mapEntityToModel(movie);
  }

  async findMany({ after, before, first, last }: PaginationArgs, where: FindMoviesInput): Promise<MoviesModel> {
    const res = await findManyCursorConnection(
      (args) => this.prismaService.movie.findMany({ where }),
      () => this.prismaService.movie.count({ where }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new MovieMapper().mapEntityToModel(edge.node),
      })),
    };
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

  async create(data: CreateMovieInput): Promise<MovieModel> {
    const movie = await this.prismaService.movie.create({
      data: {
        ...data,
        rating: {
          create: {
            value: null,
          },
        },
        pageInfo: {
          create: {
            description: null,
            title: null,
          },
        },
      },
    });

    return new MovieMapper().mapEntityToModel(movie);
  }
}
