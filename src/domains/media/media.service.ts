import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { MediaLinkMapper } from './mappers/media-link.mapper';
import { BaseService } from '../../common/services/base.service';
import { MediaMapper } from './mappers/media.mapper';
import { MediaModel } from './models/media.model';
import { FindMediasInput } from './dto/find-medias.input';
import { CreateMediaInput } from './dto/create-media.input';
import { MediasModel } from './models/medias.model';
import { MediaLinkModel } from './models/media-link.model';

@Injectable()
export class MediaService extends BaseService(
  'media',
  MediaModel,
  MediaModel,
  MediasModel,
  FindMediasInput,
  CreateMediaInput,
  MediaMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
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
