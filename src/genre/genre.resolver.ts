import { GenreService } from './genre.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GenreModel } from './models/genre.model';
import GenreLoader from './genre.loader';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import { GenresModel } from './models/genres.model';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FindGenresInput } from 'src/genre/dto/find-genres.input';

@Resolver(() => GenreModel)
export class GenreResolver {
  constructor(private readonly genreService: GenreService, private readonly genreLoader: GenreLoader) {}

  @Query(() => GenreModel)
  async genre(@Args('id') id: string): Promise<GenreModel> {
    return this.genreService.findOne(id);
  }

  @Query(() => GenresModel)
  async genres(@Args() pagination: PaginationArgs, @Args('data') dto: FindGenresInput): Promise<GenresModel> {
    return this.genreService.findMany(pagination, dto);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async images(@Parent() genre: GenreModel): Promise<ImageLinkModel[]> {
    return this.genreLoader.batchImages.load(genre.id);
  }
}
