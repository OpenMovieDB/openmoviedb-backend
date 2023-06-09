import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PageModel } from './models/page.model';
import { PageService } from './page.service';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FindMoviesInput } from 'src/movie/dto/find-movies.input';
import { MoviesModel } from 'src/movie/models/movies.model';
import { PagesModel } from './models/pages.model';
import { FindPagesInput } from './dto/find-pages.input';
import { CreatePageInput } from './dto/create-page.input';

@Resolver(() => PageModel)
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

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
}
