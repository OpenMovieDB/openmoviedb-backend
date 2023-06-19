import { Field, InputType, Int } from '@nestjs/graphql';
import { BlockType } from '../models/block.model';

@InputType()
export class CreateBlockInput {
  @Field((type) => BlockType)
  blockType: BlockType;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => Int)
  order: number;
}
