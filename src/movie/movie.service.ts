import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MovieModel } from './models/movie.model';
import { MovieMapper } from './movie.mapper';
import { FindMoviesInput } from './dto/find-movies.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { MoviesModel } from './models/movies.model';
import { GenreModel } from 'src/genre/models/genre.model';
import { GenreMapper } from 'src/genre/genre.mapper';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<MovieModel> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        countries: true,
        releases: true,
        seasons: true,
        rating: true,
        pageInfo: true,
      },
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
          include: {
            countries: true,
            releases: true,
            seasons: true,
            rating: true,
            pageInfo: true,
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

    console.log({
      pageInfo: res.pageInfo,
      totalCount: res.totalCount,

      edges: res.edges.map((edge) => ({
        cursor: edge.cursor,
        node: new MovieMapper().mapEntityToModel(edge.node),
      })),
    });

    return {
      pageInfo: res.pageInfo,
      totalCount: res.totalCount,

      edges: res.edges.map((edge) => ({
        cursor: edge.cursor,
        node: new MovieMapper().mapEntityToModel(edge.node),
      })),
    };
  }
}
