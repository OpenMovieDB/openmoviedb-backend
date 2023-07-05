import { ObjectType } from '@nestjs/graphql';

import { CollectionModel } from './collection.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class CollectionsModel extends Paginated(CollectionModel) {}
