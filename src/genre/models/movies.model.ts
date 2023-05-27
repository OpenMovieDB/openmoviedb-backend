import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { GenreModel } from './genre.model';

@ObjectType()
export class GenresModel extends PaginatedResponse(GenreModel) {}
