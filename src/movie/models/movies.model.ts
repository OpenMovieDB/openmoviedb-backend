import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { MovieModel } from './movie.model';

@ObjectType()
export class MoviesModel extends PaginatedResponse(MovieModel) {}
