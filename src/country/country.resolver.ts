import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import { CountryService } from './country.service';
import { CountriesModel } from './models/countries.model';
import { CountryModel } from './models/country.model';
import { FindCountriesInput } from './dto/find-countries.input';
import CountryLoader from './country.loader';
import { CreateCountryInput } from './dto/create-country.input';
import { CreateCountriesInput } from './dto/create-countries.input';

@Resolver(() => CountryModel)
export class CountryResolver {
  constructor(private readonly countryService: CountryService, private readonly countryLoader: CountryLoader) {}

  @Query(() => CountryModel)
  async country(@Args('id') id: string): Promise<CountryModel> {
    return this.countryService.findOne(id);
  }

  @Query(() => CountriesModel)
  async countries(@Args() pagination: PaginationArgs, @Args('data') dto: FindCountriesInput): Promise<CountriesModel> {
    return this.countryService.findMany(pagination, dto);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async images(@Parent() country: CountryModel): Promise<ImageLinkModel[]> {
    return this.countryLoader.batchImages.load(country.id);
  }

  @Mutation(() => [CountryModel])
  async createMany(@Args('data') data: CreateCountriesInput): Promise<CountryModel[]> {
    return this.countryService.createMany(data);
  }
}
