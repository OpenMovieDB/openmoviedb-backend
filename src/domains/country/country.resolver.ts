import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ImageLinkModel } from 'src/domains/image/models/image-link.model';
import { CountryService } from './country.service';
import { CountriesModel } from './models/countries.model';
import { CountryModel } from './models/country.model';
import { FindCountriesInput } from './dto/find-countries.input';
import CountryLoader from './country.loader';
import { CreateCountryInput } from './dto/create-country.input';
import { BaseResolver } from '../../common/resolvers/base.resolver';
import { UpdateCountryInput } from './dto/update-country.input';

@Resolver(() => CountryModel)
export class CountryResolver extends BaseResolver(
  'Country',
  CountryModel,
  CountriesModel,
  FindCountriesInput,
  CreateCountryInput,
  UpdateCountryInput,
  CountryService,
) {
  constructor(private readonly countryService: CountryService, private readonly countryLoader: CountryLoader) {
    super(countryService);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async countryImages(@Parent() country: CountryModel): Promise<ImageLinkModel[]> {
    return this.countryLoader.batchImages.load(country.id);
  }
}
