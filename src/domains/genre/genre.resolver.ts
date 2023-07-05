import { GenreService } from './genre.service';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GenreModel } from './models/genre.model';
import GenreLoader from './genre.loader';

import { GenresModel } from './models/genres.model';

import { CreateGenresInput } from './dto/create-genres.input';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { UpdateGenreInput } from './dto/update-genre.input';
import { CreateGenreInput } from './dto/create-genre.input';
import { FindGenresInput } from './dto/find-genres.input';
import { ImageLinkModel } from '../image/models/image-link.model';

@Resolver(() => GenreModel)
export class GenreResolver extends BaseResolver(
  'Genre',
  GenreModel,
  GenresModel,
  FindGenresInput,
  CreateGenreInput,
  UpdateGenreInput,
  GenreService,
) {
  constructor(
    private readonly genreService: GenreService,
    private readonly genreLoader: GenreLoader,
  ) {
    super(genreService);
  }

  @Mutation(() => [GenreModel])
  async createGenres(@Args('data') data: CreateGenresInput): Promise<GenreModel[]> {
    return this.genreService.createMany(data);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async genreImages(@Parent() genre: GenreModel): Promise<ImageLinkModel[]> {
    return this.genreLoader.batchImages.load(genre.id);
  }
}
