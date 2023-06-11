import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSeasonsInput } from './create-seasons.input';

@InputType()
export class UpdateSeasonInput extends PartialType(CreateSeasonsInput) {}
