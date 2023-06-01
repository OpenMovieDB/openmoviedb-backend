import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenreModel } from 'src/genre/models/genre.model';
import { SeasonModel } from './models/season.model';
import { SeasonMapper } from './mappers/season.mapper';
import { CreateSeasonsInput } from './dto/create-seasons.input';
import { ReleaseDateType } from '@prisma/client';
import { UpdateSeasonsInput } from './dto/update-seasons.input';

@Injectable()
export class SeasonService {
  private readonly defaultInclude = {
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
  };
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByMovieIds(ids: string[]): Promise<SeasonModel[]> {
    const res = await this.prismaService.season.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      ...this.defaultInclude,
    });

    return new SeasonMapper().mapEntitiesToModels(res);
  }

  async createMany({ items }: CreateSeasonsInput): Promise<SeasonModel[]> {
    const seasons = await this.prismaService.$transaction(
      items.map((item) =>
        this.prismaService.season.create({
          data: {
            number: item.number,
            movieId: item.movieId,
          },
          ...this.defaultInclude,
        }),
      ),
    );

    return new SeasonMapper().mapEntitiesToModels(seasons);
  }

  async updateMany({ items }: UpdateSeasonsInput): Promise<SeasonModel[]> {
    const seasons = await this.prismaService.$transaction(
      items.map((item) =>
        this.prismaService.season.update({
          where: {
            id: item.id,
          },
          data: {
            number: item.number,
          },
          ...this.defaultInclude,
        }),
      ),
    );

    return new SeasonMapper().mapEntitiesToModels(seasons);
  }
}
