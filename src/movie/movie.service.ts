import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MovieModel } from './models/movie.model';
import { MovieMapper } from './movie.mapper';
import { FindMoviesInput } from './dto/find-movies.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { MoviesModel } from './models/movies.model';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<MovieModel> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
    });

    return new MovieMapper().mapEntityToModel(movie);
  }

  async findMany({ after, before, first, last }: PaginationArgs, dto: FindMoviesInput): Promise<MoviesModel> {
    const res = await findManyCursorConnection(
      (args) =>
        this.prismaService.movie.findMany({
          where: {
            title: {
              contains: dto.title,
            },
          },
        }),
      () =>
        this.prismaService.movie.count({
          where: {
            title: {
              contains: dto.title,
            },
          },
        }),
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
}
