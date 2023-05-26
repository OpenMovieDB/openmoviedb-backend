import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FilmographyEntryMovieModel } from './models/filmography-entry.model';
import { FilmographyEntryMovieMapper } from './mappers/filmography-entry-movie.mapper';

@Injectable()
export class PersonService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyFilmographyEntryByMovieIds(ids: string[]): Promise<FilmographyEntryMovieModel[]> {
    const entries = await this.prismaService.filmographyEntry.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      include: {
        person: {
          include: {
            externalIDs: true,
            images: {
              include: {
                image: {
                  include: {
                    assets: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return new FilmographyEntryMovieMapper().mapEntitiesToModels(entries);
  }
}
