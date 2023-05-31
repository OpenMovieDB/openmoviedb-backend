import { InputType, Field } from '@nestjs/graphql';
import { CreateGenreInput } from './create-genre.input';

@InputType()
export class CreateGenresInput {
  @Field(() => [CreateGenreInput])
  items: CreateGenreInput[];
}
