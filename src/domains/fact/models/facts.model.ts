import { ObjectType } from '@nestjs/graphql';
import { FactModel } from './fact.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class FactsModel extends Paginated(FactModel) {}
