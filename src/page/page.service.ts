import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PageService {
  constructor(private readonly prismaService: PrismaService) {}
}
