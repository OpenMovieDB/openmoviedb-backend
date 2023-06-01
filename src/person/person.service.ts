import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FilmographyEntryMovieModel } from './models/filmography-entry.model';
import { FilmographyEntryMovieMapper } from './mappers/filmography-entry-movie.mapper';
import { CreatePersonInput } from './dto/create-person.input';
import { PersonModel } from './models/person.model';
import { PersonMapper } from './mappers/person.mapper';
import { UpdatePersonInput } from './dto/update-person.input';

@Injectable()
export class PersonService {
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
  constructor(private readonly prismaService: PrismaService) {}

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

  async create(data: CreatePersonInput): Promise<PersonModel> {
    const person = await this.prismaService.person.create({
      data,
      ...this.defaultPersonIncludes,
    });
    return new PersonMapper().mapEntityToModel(person);
  }

  async update(data: UpdatePersonInput): Promise<PersonModel> {
    const person = await this.prismaService.person.update({
      where: {
        id: data.id,
      },
      data,
      ...this.defaultPersonIncludes,
    });
    return new PersonMapper().mapEntityToModel(person);
  }
}
