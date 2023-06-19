import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { ExternalIDModel } from './external-id.model';

@ObjectType()
export class ExternalIDsModel extends PaginatedResponse(ExternalIDModel) {}
