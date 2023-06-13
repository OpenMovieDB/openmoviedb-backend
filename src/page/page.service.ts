import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FindPagesInput } from './dto/find-pages.input';
import { PageModel } from './models/page.model';
import { PagesModel } from './models/pages.model';
import { PageMapper } from './page.mapper';
import { CreatePageInput } from './dto/create-page.input';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class PageService extends BaseService(
  'page',
  PageModel,
  PageModel,
  PagesModel,
  FindPagesInput,
  CreatePageInput,
  PageMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }
}
