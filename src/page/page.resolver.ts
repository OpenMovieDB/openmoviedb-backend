import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PageModel } from './models/page.model';
import { PageService } from './page.service';
import { CreatePageInput } from './dto/create-page.input';
import { PageInfoModel } from 'src/page-info/models/page-info.model';
import { FindPagesInput } from './dto/find-pages.input';
import { PagesModel } from './models/pages.model';
import PagesLoader from './page.loader';
import { BaseResolver } from '../common/resolvers/base.resolver';
import { BlockModel } from '../block/models/block.model';
import { UpdatePageInput } from './dto/update-page.input';

@Resolver(() => PageModel)
export class PageResolver extends BaseResolver(
  'Page',
  PageModel,
  PagesModel,
  FindPagesInput,
  CreatePageInput,
  UpdatePageInput,
  PageService,
) {
  constructor(private readonly pageService: PageService, private readonly pagesLoader: PagesLoader) {
    super(pageService);
  }

  @ResolveField('pageInfo', () => PageInfoModel, { nullable: true })
  async pageInfo(@Parent() page: PageModel): Promise<PageInfoModel> {
    return this.pagesLoader.batchPageInfo.load(page.pageInfoId);
  }

  @ResolveField('blocks', () => BlockModel, { nullable: true })
  async blocks(@Parent() page: PageModel): Promise<BlockModel> {
    return this.pagesLoader.batchBlocks.load(page.id);
  }
}
