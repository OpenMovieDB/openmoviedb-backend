import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SeasonModel } from './models/season.model';
import { CreateSeasonsInput } from './dto/create-seasons.input';
import { CreateEpisodesInput } from './dto/create-episodes.input';
import { EpisodeMapper } from './mappers/episode.mapper';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { BaseService } from '../../common/services/base.service';
import { SeasonMapper } from './mappers/season.mapper';
import { CreateSeasonInput } from './dto/create-season.input';
import { FindSeasonsInput } from './dto/find-seasons.input';
import { SeasonsModel } from './models/seasons.model';

@Injectable()
export class SeasonService extends BaseService(
  'season',
  SeasonModel,
  SeasonModel,
  SeasonsModel,
  FindSeasonsInput,
  CreateSeasonInput,
  SeasonMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }
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

  async updateEpisode(id: string, data: UpdateEpisodeInput): Promise<SeasonModel> {
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
