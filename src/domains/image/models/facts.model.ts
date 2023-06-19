import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { FactModel } from '../../fact/models/fact.model';

@ObjectType()
export class FactsModel extends PaginatedResponse(FactModel) {}
