import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSliderInput } from './create-slider.input';

@InputType()
export class UpdateSliderInput extends PartialType(CreateSliderInput) {}
