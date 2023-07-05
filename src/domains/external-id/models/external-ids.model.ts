import { ObjectType } from '@nestjs/graphql';

import { ExternalIDModel } from './external-id.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class ExternalIDsModel extends Paginated(ExternalIDModel) {}
