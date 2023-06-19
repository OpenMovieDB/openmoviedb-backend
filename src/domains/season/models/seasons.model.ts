import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { SeasonModel } from './season.model';

@ObjectType()
export class SeasonsModel extends PaginatedResponse(SeasonModel) {}
