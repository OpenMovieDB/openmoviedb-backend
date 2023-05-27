import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PageInfoModel } from './page-info.model';
import { PageInfoMapper } from './page-info.mapper';

@Injectable()
export class PageInfoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByIds(ids: string[]): Promise<PageInfoModel[]> {
    const pagesInfo = await this.prismaService.pageInfo.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        seo: {
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
      },
    });
    return new PageInfoMapper().mapEntitiesToModels(pagesInfo);
  }
}
