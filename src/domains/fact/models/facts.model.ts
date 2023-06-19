import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { FactModel } from './fact.model';

@ObjectType()
export class FactsModel extends PaginatedResponse(FactModel) {}
