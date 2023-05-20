import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import { BasePageModel } from 'src/common/models/base-page.model';
import { FilmographyEntryMovieModel } from '../../person/models/filmography-entry.model';
import { CollectionModel } from '../../collection/models/collection.model';
import { MediaModel } from '../../common/models/media.movie';
import { GenreModel } from '../../genre/models/genre.model';
import { SeasonModel } from '../../season/models/season.model';
import { RatingModel } from '../../rating/models/rating.model';
import { CountryModel } from '../../country/models/country.model';
import { FactModel } from '../../fact/models/fact.model';
import { ReleaseDateModel } from '../../release-date/models/release-date.model';
import { SlideModel } from '../../slider/models/slide.model';
import { ImageModel } from '../../common/models/image.model';
import { ExternalIDModel } from '../../external-id/models/external-id.model';

enum MovieType {
  MOVIE,
  TV_SERIES,
}

registerEnumType(MovieType, {
  name: 'MovieType',
  description: 'Type of the movie',
});

@ObjectType()
export class MovieModel extends BasePageModel {
  @Field()
  slug: string;

  @Field((type) => MovieType)
  type: MovieType;

  @Field((type) => [ExternalIDModel])
  externalIDs: ExternalIDModel[];

  @Field()
  title: string;

  @Field({ nullable: true })
  originalTitle?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int)
  year: number;

  @Field((type) => [MediaModel])
  medias: MediaModel[];

  @Field((type) => [ImageModel])
  images: ImageModel[];

  @Field((type) => [FilmographyEntryMovieModel])
  persons: FilmographyEntryMovieModel[];

  @Field((type) => [GenreModel])
  genres: GenreModel[];

  @Field((type) => [CountryModel])
  countries: CountryModel[];

  @Field((type) => [ReleaseDateModel])
  releases: ReleaseDateModel[];

  @Field((type) => [SeasonModel])
  seasons: SeasonModel[];

  @Field((type) => RatingModel)
  rating: RatingModel;

  @Field((type) => [CollectionModel])
  collection: CollectionModel[];

  @Field((type) => [SlideModel])
  slides: SlideModel[];

  @Field((type) => [FactModel])
  fact: FactModel[];
}
