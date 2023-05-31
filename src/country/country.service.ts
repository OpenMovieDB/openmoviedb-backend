import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CountryModel } from './models/country.model';
import { CountryMapper } from './country.mapper';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FindCountriesInput } from './dto/find-countries.input';
import { CountriesModel } from './models/countries.model';
import { CreateCountriesInput } from './dto/create-countries.input';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<CountryModel> {
    const country = await this.prismaService.country.findUnique({
      where: { id },
    });

    return new CountryMapper().mapEntityToModel(country);
  }

  async findMany({ after, before, first, last }: PaginationArgs, dto: FindCountriesInput): Promise<CountriesModel> {
    const res = await findManyCursorConnection(
      (args) =>
        this.prismaService.country.findMany({
          where: {
            title: {
              contains: dto.title,
            },
          },
        }),
      () =>
        this.prismaService.country.count({
          where: {
            title: {
              contains: dto.title,
            },
          },
        }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new CountryMapper().mapEntityToModel(edge.node),
      })),
    };
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
