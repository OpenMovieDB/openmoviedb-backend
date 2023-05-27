import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ExternalIdService } from 'src/external-id/external-id.service';
import { MediaService } from 'src/media/media.service';
import { ImageService } from '../image/image.service';
import { PersonService } from '../person/person.service';
import { GenreService } from 'src/genre/genre.service';
import { CountryService } from 'src/country/country.service';
import { ReleaseDateService } from 'src/release-date/release-date.service';
import { SeasonService } from 'src/season/season.service';
import { FactService } from 'src/fact/fact.service';

@Injectable({ scope: Scope.REQUEST })
export default class MoviesLoader {
  constructor(
    private readonly externalIdService: ExternalIdService,
    private readonly mediaService: MediaService,
    private readonly imageService: ImageService,
    private readonly personService: PersonService,
    private readonly genreService: GenreService,
    private readonly countryService: CountryService,
    private readonly seasonService: SeasonService,
    private readonly releaseDateService: ReleaseDateService,
    private readonly factService: FactService,
  ) {}

  public readonly batchExternalIds = new DataLoader(async (ids: string[]) => {
    const res = await this.externalIdService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((externalId) => externalId.movieId === id));
  });

  public readonly batchMedias = new DataLoader(async (ids: string[]) => {
    const res = await this.mediaService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((externalId) => externalId.movieId === id));
  });

  public readonly batchImages = new DataLoader(async (ids: string[]) => {
    const res = await this.imageService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((externalId) => externalId.movieId === id));
  });

  public readonly batchFilmographyEntry = new DataLoader(async (ids: string[]) => {
    const res = await this.personService.findManyFilmographyEntryByMovieIds(ids);
    return ids.map((id) => res.filter((person) => person.movieId === id));
  });

  public readonly batchGenres = new DataLoader(async (ids: string[]) => {
    const res = await this.genreService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((genre) => genre.movieId === id).flatMap((genre) => genre.genres));
  });

  public readonly batchCountries = new DataLoader(async (ids: string[]) => {
    const res = await this.countryService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((country) => country.movieId === id).flatMap((country) => country.countries));
  });

  public readonly batchReleases = new DataLoader(async (ids: string[]) => {
    const res = await this.releaseDateService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((release) => release.movieId === id));
  });

  public readonly batchFacts = new DataLoader(async (ids: string[]) => {
    const res = await this.factService.findManyByMovieIds(ids);
    return ids.map((id) => res.filter((fact) => fact.movieId === id));
  });
}
