import { Field, InputType } from '@nestjs/graphql';
import { UpdateSeasonInput } from './update-season.input';

@InputType()
export class UpdateSeasonsInput {
  @Field(() => [UpdateSeasonInput])
  items: UpdateSeasonInput[];
}
