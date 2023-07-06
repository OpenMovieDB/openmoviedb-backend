import { Injectable } from '@nestjs/common';
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client';
import { Prisma } from '@prisma/client';
import { MovieType } from '.prisma/client';
import slugify from 'slugify';

@Injectable()
export class MovieConverter {
  kpModel2CreateMovie(model: MovieDtoV13): Prisma.MovieCreateInput {
    const slug = slugify(model.name);
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
              data: Object.keys(model.rating).map((key) => ({
                vendor: model.rating[key].source,
                value: model.rating[key].value,
              })),
            },
          },
        },
      },
      slug: slug,
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
}
