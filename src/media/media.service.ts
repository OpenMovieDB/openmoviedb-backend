import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MediaLinkModel } from 'src/media/models/media-link.model';
import { MediaLinkMapper } from './mappers/media-link.mapper';

@Injectable()
export class MediaService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<MediaLinkModel> {
    const media = await this.prismaService.mediaLink.findUnique({
      where: { id },
      include: {
        media: {
          include: {
            assets: true,
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
      },
    });

    return new MediaLinkMapper().mapEntityToModel(media);
  }

  async findManyByMovieIds(ids: string[]): Promise<MediaLinkModel[]> {
    const medias = await this.prismaService.mediaLink.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      include: {
        media: {
          include: {
            assets: true,
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
      },
    });
    return new MediaLinkMapper().mapEntitiesToModels(medias);
  }
}
