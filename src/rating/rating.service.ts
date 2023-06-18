import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RatingModel } from './models/rating.model';
import { RatingMapper } from './rating.mapper';
import { CreateManyVendorRatingInput } from './dto/create-many-vendor-rating.input';
import { UpdateVendorRatingInput } from './dto/update-vendor-rating.input';

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

  async createManyVendorRating(ratingId: string, dto: CreateManyVendorRatingInput): Promise<RatingModel> {
    return await this.prismaService.rating.update({
      where: {
        id: ratingId,
      },
      data: {
        vendorRatings: {
          createMany: {
            data: dto.vendorRatings,
          },
        },
      },
    });
  }

  async updateVendorRating(id: string, dto: UpdateVendorRatingInput): Promise<RatingModel> {
    return await this.prismaService.vendorRating.update({
      where: {
        id,
      },
      data: {
        value: dto.value,
      },
    });
  }
}
