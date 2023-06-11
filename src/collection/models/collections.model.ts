import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { CollectionModel } from './collection.model';

@ObjectType()
export class CollectionsModel extends PaginatedResponse(CollectionModel) {}
