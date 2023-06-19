import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSlideInput } from './create-slide.input';

@InputType()
export class UpdateSlideInput extends PartialType(CreateSlideInput) {}
