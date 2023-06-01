import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenreModel } from 'src/genre/models/genre.model';
import { SeasonModel } from './models/season.model';
import { SeasonMapper } from './mappers/season.mapper';
import { CreateSeasonsInput } from './dto/create-seasons.input';
import { ReleaseDateType } from '@prisma/client';
import { CreateEpisodesInput } from './dto/create-episodes.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { EpisodeMapper } from './mappers/episode.mapper';
import { UpdateEpisodeInput } from './dto/update-episode.input';
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

  async update({ id, ...data }: UpdateSeasonInput): Promise<SeasonModel> {
    const season = await this.prismaService.season.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
      ...this.defaultInclude,
    });

    return new SeasonMapper().mapEntityToModel(season);
  }

  async addEpisodes({ seasonId, items }: CreateEpisodesInput): Promise<SeasonModel> {
    const season = await this.prismaService.season.update({
      where: {
        id: seasonId,
      },
      data: {
        episodes: {
          create: items,
        },
      },
      ...this.defaultInclude,
    });

    return new SeasonMapper().mapEntityToModel(season);
  }

  async updateEpisode({ id, ...data }: UpdateEpisodeInput): Promise<SeasonModel> {
    const season = await this.prismaService.episode.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
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
    });

    return new EpisodeMapper().mapEntityToModel(season);
  }
}
