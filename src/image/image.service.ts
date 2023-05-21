import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ImageMapper } from './mappers/image.mapper';
import { ImageModel } from '../common/models/image.model';

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
}
