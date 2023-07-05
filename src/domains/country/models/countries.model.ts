import { ObjectType } from '@nestjs/graphql';

import { CountryModel } from './country.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class CountriesModel extends Paginated(CountryModel) {}
