import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenreModel } from './models/genre.model';
import { GenreMapper } from './genre.mapper';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByMoviesIds(ids: string[]): Promise<{ movieId: string; genres: GenreModel[] }[]> {
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
}
