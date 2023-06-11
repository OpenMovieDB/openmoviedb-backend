import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { BlockModel } from './block.model';

@ObjectType()
export class BlocksModel extends PaginatedResponse(BlockModel) {}
