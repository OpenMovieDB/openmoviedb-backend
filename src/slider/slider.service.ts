import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { SliderModel } from './models/slider.model';
import { SliderMapper } from './slider.mapper';
import { FindSlidersInput } from './dto/find-slider.input';
import { SlidersModel } from './models/sliders.model';

@Injectable()
export class SliderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<SliderModel> {
    const slider = await this.prismaService.slider.findUnique({
      where: { id },
    });

    return new SliderMapper().mapEntityToModel(slider);
  }

  async findMany({ after, before, first, last }: PaginationArgs, where: FindSlidersInput): Promise<SlidersModel> {
    const res = await findManyCursorConnection(
      (args) => this.prismaService.slider.findMany({ where }),
      () => this.prismaService.slider.count({ where }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new SliderMapper().mapEntityToModel(edge.node),
      })),
    };
  }
}
