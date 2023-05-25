import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ReleaseDateMapper } from './release-date.mapper';
import { ReleaseDateModel } from './models/release-date.model';
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
}
