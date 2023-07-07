import { Injectable } from '@nestjs/common';
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';
import { Prisma } from '@prisma/client';
import { MovieType, Vendor } from '.prisma/client';
import slugify from 'slugify';

@Injectable()
export class MovieConverter {
  kpModel2CreateMovie(model: MovieDtoV13): Prisma.MovieCreateInput {
    const name = (model.name || model.alternativeName || model.names[0]?.name).replace(/[^\p{L}\p{N} ]/gu, '');
    const slug = slugify(name);
    return {
      type: model.isSeries ? MovieType.TV_SERIES : MovieType.MOVIE,
      title: model.name,
      originalTitle: model.alternativeName,
      pageInfo: {
        create: {
          title: model.name || model.alternativeName + ' ' + model.year,
          description: model.description,
        },
      },
      rating: {
        create: {
          vendorRatings: {
            createMany: {
              data: Object.keys(model.rating)
                .map((key) => ({
                  vendor: this.kpVendor2VendorType(key),
                  value: model.rating[key],
                }))
                .filter((rating) => rating.vendor),
            },
          },
        },
      },
      slug: slug.toLowerCase(),
      year: model.year,
      genres: {
        connectOrCreate: model.genres.map((genre) => ({
          where: { slug: slugify(genre.name) },
          create: { title: genre.name, slug: slugify(genre.name), pageInfo: { create: { title: genre.name } } },
        })),
      },
      countries: {
        connectOrCreate: model.countries.map((country) => ({
          where: { slug: slugify(country.name) },
          create: { title: country.name, slug: slugify(country.name), pageInfo: { create: { title: country.name } } },
        })),
      },
    };
  }

  kpModels2CreateMovies(models: MovieDtoV13[]): Prisma.MovieCreateInput[] {
    return models.map((model) => this.kpModel2CreateMovie(model));
  }

  kpVendor2VendorType(type: string): Vendor {
    switch (type) {
      case 'kinopoisk':
        return Vendor.KINOPOISK;
      case 'kp':
        return Vendor.KINOPOISK;
      case 'imdb':
        return Vendor.IMDB;
      case 'tmdb':
        return Vendor.TMDB;
      default:
        console.warn(`Unknown vendor type: ${type}`);
        break;
    }
  }
}
