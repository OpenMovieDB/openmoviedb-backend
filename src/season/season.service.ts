import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenreModel } from 'src/genre/models/genre.model';
import { SeasonModel } from './models/season.model';
import { SeasonMapper } from './mappers/season.mapper';

@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByMovieIds(ids: string[]): Promise<SeasonModel[]> {
    const res = await this.prismaService.season.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      include: {
        episodes: {
          include: {
            image: {
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
        releaseDate: true,
      },
    });

    return new SeasonMapper().mapEntitiesToModels(res);
  }
}
