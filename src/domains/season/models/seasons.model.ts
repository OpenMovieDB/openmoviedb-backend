import { ObjectType } from '@nestjs/graphql';

import { SeasonModel } from './season.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class SeasonsModel extends Paginated(SeasonModel) {}
