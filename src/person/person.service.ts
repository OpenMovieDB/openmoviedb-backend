import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FilmographyEntryMovieModel } from './models/filmography-entry.model';
import { FilmographyEntryMovieMapper } from './mappers/filmography-entry-movie.mapper';
import { CreatePersonInput } from './dto/create-person.input';
import { PersonModel } from './models/person.model';
import { PersonMapper } from './mappers/person.mapper';
import { BaseService } from '../common/services/base.service';
import { PersonsModel } from './models/persons.model';
import { FindPersonsInput } from './dto/find-persons.input';

@Injectable()
export class PersonService extends BaseService(
  'block',
  PersonModel,
  PersonModel,
  PersonsModel,
  FindPersonsInput,
  CreatePersonInput,
  PersonMapper,
) {
  private readonly defaultPersonIncludes = {
    include: {
      externalIDs: true,
      images: {
        include: {
          image: {
            include: {
              assets: true,
            },
          },
        },
      },
    },
  };
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }
  async findManyFilmographyEntryByMovieIds(ids: string[]): Promise<FilmographyEntryMovieModel[]> {
    const entries = await this.prismaService.filmographyEntry.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
      include: {
        person: {
          ...this.defaultPersonIncludes,
        },
      },
    });

    return new FilmographyEntryMovieMapper().mapEntitiesToModels(entries);
  }
}
