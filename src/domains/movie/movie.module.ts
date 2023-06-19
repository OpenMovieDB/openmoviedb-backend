import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import MoviesLoader from './movie.loader';
import { ExternalIdModule } from 'src/domains/external-id/external-id.module';
import { MediaModule } from 'src/domains/media/media.module';
import { ImageModule } from '../image/image.module';
import { PersonModule } from '../person/person.module';
import { GenreModule } from 'src/domains/genre/genre.module';
import { CountryModule } from 'src/domains/country/country.module';
import { FactModule } from 'src/domains/fact/fact.module';
import { SeasonModule } from 'src/domains/season/season.module';
import { ReleaseDateModule } from 'src/domains/release-date/release-date.module';
import { RatingModule } from 'src/domains/rating/rating.module';
import { PageInfoModule } from 'src/domains/page-info/page-info.module';
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
