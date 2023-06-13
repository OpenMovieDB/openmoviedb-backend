import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FindBlocksInput } from './dto/find-blocks.input';
import { BlockMapper } from './block.mapper';
import { CreateBlockInput } from './dto/create-block.input';
import { BlocksModel } from './models/blocks.model';
import { BlockModel } from './models/block.model';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class BlockService extends BaseService(
  'block',
  BlockModel,
  BlockModel,
  BlocksModel,
  FindBlocksInput,
  CreateBlockInput,
  BlockMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
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
}
