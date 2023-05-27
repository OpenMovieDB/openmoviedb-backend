import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SeoService {
  constructor(private readonly prismaService: PrismaService) {}
}
