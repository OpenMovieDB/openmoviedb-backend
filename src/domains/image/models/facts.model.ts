import { ObjectType } from '@nestjs/graphql';
import { FactModel } from '../../fact/models/fact.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class FactsModel extends Paginated(FactModel) {}
