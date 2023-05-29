import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { ImageLinkModel } from 'src/image/models/image-link.model';
import { CountryService } from './country.service';
import { CountriesModel } from './models/countries.model';
import { CountryModel } from './models/country.model';
import { FindCountriesInput } from './dto/find-countries.input';
import CountryLoader from './country.loader';

@Resolver(() => CountryModel)
export class CountryResolver {
  constructor(private readonly genreService: CountryService, private readonly genreLoader: CountryLoader) {}

  @Query(() => CountryModel)
  async country(@Args('id') id: string): Promise<CountryModel> {
    return this.genreService.findOne(id);
  }

  @Query(() => CountriesModel)
  async genres(@Args() pagination: PaginationArgs, @Args('data') dto: FindCountriesInput): Promise<CountriesModel> {
    return this.genreService.findMany(pagination, dto);
  }

  @ResolveField('images', () => [ImageLinkModel], { nullable: true })
  async images(@Parent() country: CountryModel): Promise<ImageLinkModel[]> {
    return this.genreLoader.batchImages.load(country.id);
  }
}
