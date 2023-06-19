import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBlockInput } from './create-block.input';

@InputType()
export class UpdateBlockInput extends PartialType(CreateBlockInput) {}
