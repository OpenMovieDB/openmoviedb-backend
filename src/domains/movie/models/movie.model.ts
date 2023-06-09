import { Field, Int, ObjectType } from '@nestjs/graphql';

import { FilmographyEntryMovieModel } from '../../person/models/filmography-entry.model';
import { CollectionModel } from '../../collection/models/collection.model';
import { GenreModel } from '../../genre/models/genre.model';
import { SeasonModel } from '../../season/models/season.model';
import { RatingModel } from '../../rating/models/rating.model';
import { CountryModel } from '../../country/models/country.model';
import { FactModel } from '../../fact/models/fact.model';
import { ReleaseDateModel } from '../../release-date/models/release-date.model';
import { ExternalIDModel } from '../../external-id/models/external-id.model';
import { ImageLinkModel } from '../../image/models/image-link.model';
import { MediaLinkModel } from '../../media/models/media-link.model';
import { MovieType } from './movie-type.enum';
import { BasePageModel } from '../../../common/models/base-page.model';
import { SlideModel } from '../../slide/models/slide.model';

@ObjectType()
export class MovieModel extends BasePageModel {
  @Field()
  slug: string;

  @Field((type) => MovieType)
  type: MovieType;

  @Field((type) => [ExternalIDModel], { nullable: 'itemsAndList' })
  externalIDs?: ExternalIDModel[];

  @Field()
  title: string;

  @Field({ nullable: true })
  originalTitle?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Int)
  year: number;

  @Field((type) => [MediaLinkModel], { nullable: 'itemsAndList' })
  medias?: MediaLinkModel[];

  @Field((type) => [ImageLinkModel], { nullable: 'itemsAndList' })
  images?: ImageLinkModel[];

  @Field((type) => [FilmographyEntryMovieModel], { nullable: 'itemsAndList' })
  persons?: FilmographyEntryMovieModel[];

  @Field((type) => [GenreModel], { nullable: 'itemsAndList' })
  genres?: GenreModel[];

  @Field((type) => [CountryModel], { nullable: 'itemsAndList' })
  countries?: CountryModel[];

  @Field((type) => [ReleaseDateModel], { nullable: 'itemsAndList' })
  releases?: ReleaseDateModel[];

  @Field((type) => [SeasonModel], { nullable: 'itemsAndList' })
  seasons?: SeasonModel[];

  @Field()
  ratingId?: string;

  @Field((type) => RatingModel, { nullable: true })
  rating?: RatingModel;

  @Field((type) => [CollectionModel], { nullable: 'itemsAndList' })
  collection?: CollectionModel[];

  @Field((type) => [SlideModel], { nullable: 'itemsAndList' })
  slides?: SlideModel[];

  @Field((type) => [FactModel], { nullable: 'itemsAndList' })
  facts?: FactModel[];
}
