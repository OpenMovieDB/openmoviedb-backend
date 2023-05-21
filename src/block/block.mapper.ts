import { BlockModel } from './models/block.model';
import { IMapper } from '../common/interfaces/mapper.interface';
import { Block } from '@prisma/client';

type BlockEntity = Block;

export class BlockMapper implements IMapper<BlockEntity, BlockModel> {
  public mapEntityToModel(entity: BlockEntity): BlockModel {
    return {
      ...entity,
    };
  }

  public mapEntitiesToModels(entities: BlockEntity[]): BlockModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
