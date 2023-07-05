import { Field, InputType } from '@nestjs/graphql';
import { UuidFilterInput } from '../../../common/dto/uuid-filter.input';
import { StringFilterInput } from '../../../common/dto/string-filter.input';
import { AbstractRelationListFilterInput } from '../../../common/dto/abstract-relation-list-filter.input';

@InputType()
export class CountryWhereInput {
  @Field({ nullable: true })
  id?: UuidFilterInput;

  @Field({ nullable: true })
  slug?: StringFilterInput;

  @Field({ nullable: true })
  title?: StringFilterInput;
}

@InputType()
export class CountryRelationInput extends AbstractRelationListFilterInput(CountryWhereInput) {}
