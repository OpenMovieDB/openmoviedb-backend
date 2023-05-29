import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { CountryModel } from './country.model';

@ObjectType()
export class CountriesModel extends PaginatedResponse(CountryModel) {}
