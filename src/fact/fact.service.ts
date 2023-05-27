import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FactModel } from './models/fact.model';
import { FactMapper } from './fact.mapper';

@Injectable()
export class FactService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByMovieIds(ids: string[]): Promise<FactModel[]> {
    const facts = await this.prismaService.fact.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
    });
    return new FactMapper().mapEntitiesToModels(facts);
  }
}
