import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PageInfoModel } from './page-info.model';
import { UpdatePageInfoInput } from './dto/update-page-info.input';
import { PageInfoService } from './page-info.service';

@Resolver(() => PageInfoModel)
export class PageInfoResolver {
  constructor(private readonly pageInfoService: PageInfoService) {}

  @Mutation(() => PageInfoModel)
  async update(@Args('data') data: UpdatePageInfoInput): Promise<PageInfoModel> {
    return this.pageInfoService.update(data);
  }
}
