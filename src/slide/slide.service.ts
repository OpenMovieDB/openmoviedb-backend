import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { SlideModel } from './models/slide.model';
import { SlideMapper } from './slide.mapper';
import { FindSlidesInput } from './dto/find-slides.input';
import { SlidesModel } from './models/slides.model';

@Injectable()
export class SlideService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<SlideModel> {
    const slide = await this.prismaService.slide.findUnique({
      where: { id },
    });

    return new SlideMapper().mapEntityToModel(slide);
  }

  async findMany({ after, before, first, last }: PaginationArgs, where: FindSlidesInput): Promise<SlidesModel> {
    const res = await findManyCursorConnection(
      (args) => this.prismaService.slide.findMany({ where }),
      () => this.prismaService.slide.count({ where }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new SlideMapper().mapEntityToModel(edge.node),
      })),
    };
  }

  async findManyBySliderIds(ids: string[]): Promise<SlideModel[]> {
    const slides = await this.prismaService.slide.findMany({
      where: {
        sliderId: {
          in: ids,
        },
      },
    });

    return slides.map((slide) => new SlideMapper().mapEntityToModel(slide));
  }
}
