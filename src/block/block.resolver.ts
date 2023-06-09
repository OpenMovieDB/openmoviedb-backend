import { Resolver } from '@nestjs/graphql';
import { BlockModel } from './models/block.model';

@Resolver(() => BlockModel)
export class BlockResolver {}
