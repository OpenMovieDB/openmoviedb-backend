import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RatingModel } from './models/rating.model';
import { RatingMapper } from './rating.mapper';

@Injectable()
export class RatingService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByIds(ids: string[]): Promise<RatingModel[]> {
    const ratings = await this.prismaService.rating.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        vendorRatings: true,
      },
    });

    return new RatingMapper().mapEntitiesToModels(ratings);
  }

  async findManyById(id: string): Promise<RatingModel> {
    const rating = await this.prismaService.rating.findUnique({
      where: {
        id,
      },
      include: {
        vendorRatings: true,
      },
    });

    return new RatingMapper().mapEntityToModel(rating);
  }
}
