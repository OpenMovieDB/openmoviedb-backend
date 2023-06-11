import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { PaginationArgs } from '../common/pagination/pagination.args';
import { FindBlocksInput } from './dto/find-blocks.input';
import { BlockMapper } from './block.mapper';
import { CreateBlockInput } from './dto/create-block.input';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { BlocksModel } from './models/blocks.model';
import { BlockModel } from './models/block.model';

@Injectable()
export class BlockService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<BlockModel> {
    const block = await this.prismaService.block.findUnique({
      where: { id },
    });

    return new BlockMapper().mapEntityToModel(block);
  }

  async findMany({ after, before, first, last }: PaginationArgs, where: FindBlocksInput): Promise<BlocksModel> {
    const res = await findManyCursorConnection(
      (args) => this.prismaService.block.findMany({ where }),
      () => this.prismaService.block.count({ where }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new BlockMapper().mapEntityToModel(edge.node),
      })),
    };
  }

  async getBlockByIds(ids: string[]): Promise<BlockModel[]> {
    const blocks = await this.prismaService.block.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return new BlockMapper().mapEntitiesToModels(blocks);
  }

  async getBlocksByPageIds(pageIds: string[]): Promise<BlockModel[]> {
    const blocks = await this.prismaService.block.findMany({
      where: {
        pageId: {
          in: pageIds,
        },
      },
    });

    return new BlockMapper().mapEntitiesToModels(blocks);
  }

  async create(data: CreateBlockInput): Promise<BlockModel> {
    const block = await this.prismaService.block.create({
      data: {
        ...data,
      },
    });

    return new BlockMapper().mapEntityToModel(block);
  }

  async update(id: string, data: CreateBlockInput): Promise<BlockModel> {
    const block = await this.prismaService.block.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return new BlockMapper().mapEntityToModel(block);
  }
}
