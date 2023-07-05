import { ObjectType } from '@nestjs/graphql';

import { PersonModel } from './person.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class PersonsModel extends Paginated(PersonModel) {}
