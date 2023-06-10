import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PageModel } from './models/page.model';
import { PageService } from './page.service';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { CreatePageInput } from './dto/create-page.input';
import { PageInfoModel } from 'src/page-info/models/page-info.model';
import { FindPagesInput } from './dto/find-pages.input';
import { PagesModel } from './models/pages.model';
import PagesLoader from './page.loader';
import { BlockModel } from 'src/block/models/block.model';

@Resolver(() => PageModel)
export class PageResolver {
  constructor(private readonly pageService: PageService, private readonly pagesLoader: PagesLoader) {}

  @Query(() => PageModel)
  async page(@Args('id') id: string): Promise<PageModel> {
    return this.pageService.findOne(id);
  }

  @Query(() => PagesModel)
  async pages(@Args() pagination: PaginationArgs, @Args('data') dto: FindPagesInput): Promise<PagesModel> {
    return this.pageService.findMany(pagination, dto);
  }

  @Mutation(() => PageModel)
  async createPage(@Args('data') dto: CreatePageInput): Promise<PageModel> {
    return this.pageService.create(dto);
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
