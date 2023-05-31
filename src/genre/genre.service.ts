import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenreModel } from './models/genre.model';
import { GenreMapper } from './genre.mapper';
import { ImageLinkMapper } from 'src/image/mappers/image-link.mapper';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FindGenresInput } from 'src/genre/dto/find-genres.input';
import { GenresModel } from './models/genres.model';
import { CreateGenresInput } from './dto/create-genres.input';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<GenreModel> {
    const genre = await this.prismaService.genre.findUnique({
      where: { id },
    });

    return new GenreMapper().mapEntityToModel(genre);
  }

  async findMany({ after, before, first, last }: PaginationArgs, dto: FindGenresInput): Promise<GenresModel> {
    const res = await findManyCursorConnection(
      (args) =>
        this.prismaService.genre.findMany({
          where: {
            title: {
              contains: dto.title,
            },
          },
        }),
      () =>
        this.prismaService.genre.count({
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
        node: new GenreMapper().mapEntityToModel(edge.node),
      })),
    };
  }

  async findManyByMovieIds(ids: string[]): Promise<{ movieId: string; genres: GenreModel[] }[]> {
    const genresInMovies = await this.prismaService.movie.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        genres: true,
      },
    });

    return genresInMovies.map((movie) => ({
      movieId: movie.id,
      genres: new GenreMapper().mapEntitiesToModels(movie.genres),
    }));
  }

  async createMany({ items }: CreateGenresInput): Promise<GenreModel[]> {
    const countries = await this.prismaService.$transaction(
      items.map((item) =>
        this.prismaService.genre.create({
          data: {
            ...item,
            pageInfo: {
              create: {
                description: null,
                title: null,
              },
            },
          },
        }),
      ),
    );

    return new GenreMapper().mapEntitiesToModels(countries);
  }
}
