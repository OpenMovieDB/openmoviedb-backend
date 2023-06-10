import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BlockModel } from './models/block.model';
import { BlockMapper } from './block.mapper';

@Injectable()
export class BlockService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBlock(id: string) {
    const block = this.prismaService.block.findUnique({
      where: {
        id,
      },
    });
    return block;
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
}
