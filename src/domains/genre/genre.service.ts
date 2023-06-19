import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenreModel } from './models/genre.model';
import { GenreMapper } from './genre.mapper';
import { FindGenresInput } from 'src/domains/genre/dto/find-genres.input';
import { GenresModel } from './models/genres.model';
import { CreateGenresInput } from './dto/create-genres.input';
import { BaseService } from '../../common/services/base.service';
import { CreateGenreInput } from './dto/create-genre.input';

@Injectable()
export class GenreService extends BaseService(
  'genre',
  GenreModel,
  GenreModel,
  GenresModel,
  FindGenresInput,
  CreateGenreInput,
  GenreMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
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
