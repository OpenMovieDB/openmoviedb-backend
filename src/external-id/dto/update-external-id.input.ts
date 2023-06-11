import { InputType, PartialType } from '@nestjs/graphql';
import { CreateExternalIDInput } from './create-external-id.input';

@InputType()
export class UpdateExternalIDInput extends PartialType(CreateExternalIDInput) {}
