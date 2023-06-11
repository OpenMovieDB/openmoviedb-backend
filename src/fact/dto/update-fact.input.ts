import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFactInput } from './create-fact.input';

@InputType()
export class UpdateFactInput extends PartialType(CreateFactInput) {}
