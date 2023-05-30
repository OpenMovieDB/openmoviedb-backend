import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SliderService {
  constructor(private readonly prismaService: PrismaService) {}
}
