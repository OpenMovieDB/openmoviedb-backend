import { ObjectType } from '@nestjs/graphql';
import { GenreModel } from './genre.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class GenresModel extends Paginated(GenreModel) {}
