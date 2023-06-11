import { InputType } from '@nestjs/graphql';
import { BaseFindManyInput } from '../../common/dto/base-find-many.input';

@InputType()
export class FindCollectionsInput extends BaseFindManyInput {}
