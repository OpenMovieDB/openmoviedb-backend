import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import MoviesLoader from './movie.loader';

import { ImageModule } from '../image/image.module';
import { PersonModule } from '../person/person.module';
import { ExternalIdModule } from '../external-id/external-id.module';
import { MediaModule } from '../media/media.module';
import { GenreModule } from '../genre/genre.module';
import { CountryModule } from '../country/country.module';
import { FactModule } from '../fact/fact.module';
import { SeasonModule } from '../season/season.module';
import { ReleaseDateModule } from '../release-date/release-date.module';
import { RatingModule } from '../rating/rating.module';
import { PageInfoModule } from '../page-info/page-info.module';

@Module({
  imports: [
    ExternalIdModule,
    MediaModule,
    ImageModule,
    PersonModule,
    GenreModule,
    CountryModule,
    FactModule,
    SeasonModule,
    ReleaseDateModule,
    RatingModule,
    PageInfoModule,
  ],
  providers: [MovieResolver, MovieService, MoviesLoader],
  exports: [MovieService],
})
export class MovieModule {}
