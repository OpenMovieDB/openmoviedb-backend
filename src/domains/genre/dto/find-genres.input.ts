import { Field, InputType } from '@nestjs/graphql';
import { BaseFindManyInput } from '../../../common/dto/base-find-many.input';

@InputType()
export class FindGenresInput extends BaseFindManyInput {
  @Field({ nullable: true })
  title?: string;
}
