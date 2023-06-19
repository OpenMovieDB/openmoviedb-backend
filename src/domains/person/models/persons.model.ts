import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { PersonModel } from './person.model';

@ObjectType()
export class PersonsModel extends PaginatedResponse(PersonModel) {}
