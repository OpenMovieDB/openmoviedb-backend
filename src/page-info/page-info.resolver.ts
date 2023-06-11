import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PageInfoModel } from './models/page-info.model';
import { UpdatePageInfoInput } from './dto/update-page-info.input';
import { PageInfoService } from './page-info.service';
import { SeoModel } from '../seo/models/seo.model';
import PagesInfoLoader from './pages-info.loader';

@Resolver(() => PageInfoModel)
export class PageInfoResolver {
  constructor(private readonly pageInfoService: PageInfoService, private readonly pagesInfoLoader: PagesInfoLoader) {}

  @Query(() => PageInfoModel)
  async pageInfo(@Args('id') id: string): Promise<PageInfoModel> {
    return this.pageInfoService.findOne(id);
  }

  @ResolveField('seo', () => [SeoModel], { nullable: true })
  async seo(@Parent() pageInfo: PageInfoModel): Promise<SeoModel[]> {
    return this.pagesInfoLoader.batchSeo.load(pageInfo.id);
  }

  @Mutation(() => PageInfoModel)
  async updatePageInfo(@Args('data') data: UpdatePageInfoInput): Promise<PageInfoModel> {
    return this.pageInfoService.update(data);
  }
}
