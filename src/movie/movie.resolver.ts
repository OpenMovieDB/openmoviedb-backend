import { Args, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { MovieModel } from './models/movie.model';
import { FindMoviesInput } from './dto/find-movies.input';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { MoviesModel } from './models/movies.model';

@Resolver(() => MovieModel)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => MovieModel)
  async movie(@Args('id') id: string): Promise<MovieModel> {
    return this.movieService.findOne(id);
  }

  @Query(() => MoviesModel)
  async movies(
    @Args() pagination: PaginationArgs,
    @Args('data') dto: FindMoviesInput,
  ): Promise<MoviesModel> {
    return this.movieService.findMany(pagination, dto);
  }
}
