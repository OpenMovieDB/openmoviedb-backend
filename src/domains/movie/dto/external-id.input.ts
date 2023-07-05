import { Field, InputType } from '@nestjs/graphql';
import { StringFilterInput } from '../../../common/dto/string-filter.input';
import { ExternalIDSourceEnumInput, ExternalIDTypeEnumInput } from '../../external-id/models/external-id-type.enum';
import { AbstractRelationListFilterInput } from '../../../common/dto/abstract-relation-list-filter.input';

@InputType()
export class ExternalIdWhereInput {
  @Field({ nullable: true })
  value?: StringFilterInput;

  @Field({ nullable: true })
  source?: ExternalIDSourceEnumInput;

  @Field({ nullable: true })
  type?: ExternalIDTypeEnumInput;
}

@InputType()
export class ExternalIdRelationInput extends AbstractRelationListFilterInput(ExternalIdWhereInput) {}
