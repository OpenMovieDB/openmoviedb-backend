import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ReleaseDateMapper } from './release-date.mapper';
import { ReleaseDateModel } from './models/release-date.model';
import { CreateReleaseDatesInput } from './dto/create-release-dates.input';
import { Prisma } from '@prisma/client';
@Injectable()
export class ReleaseDateService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByMovieIds(ids: string[]): Promise<ReleaseDateModel[]> {
    const res = await this.prismaService.releaseDate.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
    });

    return new ReleaseDateMapper().mapEntitiesToModels(res);
  }

  async createReleaseDates({ items }: CreateReleaseDatesInput): Promise<ReleaseDateModel[]> {
    const dates = await this.prismaService.$transaction(
      items.map((item) => {
        const connect: {
          country?: Prisma.CountryCreateNestedOneWithoutReleaseDatesInput;
          movie?: Prisma.MovieCreateNestedOneWithoutReleasesInput;
          seasons?: Prisma.SeasonCreateNestedManyWithoutReleaseDateInput;
          episodes?: Prisma.EpisodeCreateNestedManyWithoutReleaseDateInput;
        } = {};

        if (item.countryId) connect.country = { connect: { id: item.countryId } };
        if (item.movieId) connect.movie = { connect: { id: item.movieId } };
        if (item.seasonId) connect.seasons = { connect: { id: item.seasonId } };
        if (item.episodeId) connect.episodes = { connect: { id: item.episodeId } };

        return this.prismaService.releaseDate.create({
          data: {
            type: item.type,
            date: item.date,
          },
        });
      }),
    );

    return new ReleaseDateMapper().mapEntitiesToModels(dates);
  }
}
