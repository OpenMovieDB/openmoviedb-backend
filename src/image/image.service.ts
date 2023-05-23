import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ImageMapper } from './mappers/image.mapper';
import { ImageModel } from './models/image.model';
import { ImageLinkModel } from './models/image-link.model';
import { ImageLinkMapper } from './mappers/image-link.mapper';

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<ImageModel> {
    const image = await this.prismaService.image.findUnique({
      where: {
        id: id,
      },
      include: {
        assets: true,
        link: true,
      },
    });
    return new ImageMapper().mapEntityToModel(image);
  }

  async findManyByMovieIds(ids: string[]): Promise<ImageLinkModel[]> {
    const images = await this.prismaService.imageLink.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      include: {
        image: {
          include: {
            assets: true,
          },
        },
      },
    });

    return new ImageLinkMapper().mapEntitiesToModels(images);
  }
}
