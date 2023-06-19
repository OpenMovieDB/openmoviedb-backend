import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCollectionInput } from './create-collection.input';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {}
