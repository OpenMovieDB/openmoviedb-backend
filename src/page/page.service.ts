import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FindPagesInput } from './dto/find-pages.input';
import { PageModel } from './models/page.model';
import { PagesModel } from './models/pages.model';
import { PageMapper } from './page.mapper';

@Injectable()
export class PageService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<PageModel> {
    const page = await this.prismaService.page.findUnique({
      where: { id },
    });

    return new PageMapper().mapEntityToModel(page);
  }

  async findMany({ after, before, first, last }: PaginationArgs, where: FindPagesInput): Promise<PagesModel> {
    const res = await findManyCursorConnection(
      (args) => this.prismaService.page.findMany({ where }),
      () => this.prismaService.page.count({ where }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new PageMapper().mapEntityToModel(edge.node),
      })),
    };
  }
}
