import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CountryModel } from './models/country.model';
import { CountryMapper } from './country.mapper';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByMoviesIds(ids: string[]): Promise<{ movieId: string; countries: CountryModel[] }[]> {
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
}
