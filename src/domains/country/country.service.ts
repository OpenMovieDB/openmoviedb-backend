import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CountryModel } from './models/country.model';
import { FindCountriesInput } from './dto/find-countries.input';
import { CountriesModel } from './models/countries.model';
import { CreateCountriesInput } from './dto/create-countries.input';
import { BaseService } from '../../common/services/base.service';
import { CreateCountryInput } from './dto/create-country.input';
import { CountryMapper } from './country.mapper';

@Injectable()
export class CountryService extends BaseService(
  'country',
  CountryModel,
  CountryModel,
  CountriesModel,
  FindCountriesInput,
  CreateCountryInput,
  CountryMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async findManyByMovieIds(ids: string[]): Promise<{ movieId: string; countries: CountryModel[] }[]> {
    const countriesInMovies = await this.prismaService.movie.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        countries: true,
      },
    });

    return countriesInMovies.map((movie) => ({
      movieId: movie.id,
      countries: new CountryMapper().mapEntitiesToModels(movie.countries),
    }));
  }

  async createMany({ items }: CreateCountriesInput): Promise<CountryModel[]> {
    const countries = await this.prismaService.$transaction(
      items.map((item) =>
        this.prismaService.country.create({
          data: {
            ...item,
            pageInfo: {
              create: {
                description: null,
                title: null,
              },
            },
          },
        }),
      ),
    );

    return new CountryMapper().mapEntitiesToModels(countries);
  }
}
