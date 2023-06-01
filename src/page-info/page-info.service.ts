import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PageInfoModel } from './page-info.model';
import { PageInfoMapper } from './page-info.mapper';
import { UpdatePageInfoInput } from './dto/update-page-info.input';

@Injectable()
export class PageInfoService {
  private readonly defaultIncludes = {
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
  };
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByIds(ids: string[]): Promise<PageInfoModel[]> {
    const pagesInfo = await this.prismaService.pageInfo.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      ...this.defaultIncludes,
    });
    return new PageInfoMapper().mapEntitiesToModels(pagesInfo);
  }

  async update({ id, ...data }: UpdatePageInfoInput): Promise<PageInfoModel> {
    const pageInfo = await this.prismaService.pageInfo.update({
      where: {
        id,
      },
      data,
      ...this.defaultIncludes,
    });
    return new PageInfoMapper().mapEntityToModel(pageInfo);
  }
}
