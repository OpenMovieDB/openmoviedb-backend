import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BasePageModel } from 'src/common/models/base-page.model';
import { FilmographyEntryMovieModel } from '../../person/models/filmography-entry.model';
import { CollectionModel } from '../../collection/models/collection.model';
import { GenreModel } from '../../genre/models/genre.model';
import { SeasonModel } from '../../season/models/season.model';
import { RatingModel } from '../../rating/models/rating.model';
import { CountryModel } from '../../country/models/country.model';
import { FactModel } from '../../fact/models/fact.model';
import { ReleaseDateModel } from '../../release-date/models/release-date.model';
import { SlideModel } from '../../slider/models/slide.model';
import { ExternalIDModel } from '../../external-id/models/external-id.model';
import { ImageLinkModel } from '../../image/models/image-link.model';
import { MediaLinkModel } from '../../media/models/media-link.model';

export enum MovieType {
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

  @Field((type) => [MediaLinkModel])
  medias: MediaLinkModel[];

  @Field((type) => [ImageLinkModel])
  images: ImageLinkModel[];

  @Field((type) => [FilmographyEntryMovieModel])
  persons: FilmographyEntryMovieModel[];

  @Field((type) => [GenreModel])
  genres: GenreModel[];

  @Field((type) => [CountryModel])
  countries: CountryModel[];

  @Field((type) => [ReleaseDateModel])
  releases: ReleaseDateModel[];

  @Field((type) => [SeasonModel])
  seasons?: SeasonModel[];

  @Field((type) => RatingModel)
  rating: RatingModel;

  @Field((type) => [CollectionModel], { nullable: true })
  collection?: CollectionModel[];

  @Field((type) => [SlideModel], { nullable: true })
  slides?: SlideModel[];

  @Field((type) => [FactModel], { nullable: true })
  facts?: FactModel[];
}
