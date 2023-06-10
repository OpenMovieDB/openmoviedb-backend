import { BlockModel, BlockType } from './models/block.model';
import { IMapper } from '../common/interfaces/mapper.interface';
import { Block, Collection, Image, ImageLink, Slider } from '@prisma/client';

export type BlockEntity = Block;
export class BlockMapper implements IMapper<BlockEntity, BlockModel> {
  public mapEntityToModel(entity: BlockEntity): BlockModel {
    return {
      ...entity,
      blockType: BlockType[entity.blockType],
      title: entity.title,
      content: entity.content,
      order: entity.order,
    };
  }

  public mapEntitiesToModels(entities: BlockEntity[]): BlockModel[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
