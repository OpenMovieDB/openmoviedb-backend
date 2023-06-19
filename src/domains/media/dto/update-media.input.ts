import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMediaInput } from './create-media.input';

@InputType()
export class UpdateMediaInput extends PartialType(CreateMediaInput) {}
