import { ObjectType } from '@nestjs/graphql';

import { MovieModel } from './movie.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class MoviesModel extends Paginated(MovieModel) {}
