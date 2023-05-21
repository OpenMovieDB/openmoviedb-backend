import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BlockService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBlock(id: string) {
    const block = this.prismaService.block.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
        collections: true,
        sliders: true,
      },
    });
    return block;
  }
}
