import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateManySeoInput } from './dto/create-many-seo-input';
import { SeoModel } from './models/seo.model';
import { SeoMapper } from './seo.mapper';
import { UpdateManySeoInput } from './dto/update-many-seo-input';

@Injectable()
export class SeoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByPageInfoIds(ids: string[]): Promise<SeoModel[]> {
    const seoItems = await this.prismaService.seo.findMany({
      where: {
        pageInfoId: {
          in: ids,
        },
      },
    });

    return new SeoMapper().mapEntitiesToModels(seoItems);
  }

  async createMany({ items }: CreateManySeoInput): Promise<SeoModel[]> {
    const seoItems = await this.prismaService.$transaction(
      items.map((item) =>
        this.prismaService.seo.create({
          data: {
            ...item,
          },
        }),
      ),
    );

    return new SeoMapper().mapEntitiesToModels(seoItems);
  }

  async updateMany({ items }: UpdateManySeoInput): Promise<SeoModel[]> {
    const seoItems = await this.prismaService.$transaction(
      items.map(({ id, ...item }) =>
        this.prismaService.seo.update({
          where: {
            id,
          },
          data: {
            ...item,
          },
        }),
      ),
    );

    return new SeoMapper().mapEntitiesToModels(seoItems);
  }
}
