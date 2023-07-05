import { ObjectType } from '@nestjs/graphql';
import { BlockModel } from './block.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class BlocksModel extends Paginated(BlockModel) {}
