import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import MoviesLoader from './movie.loader';
import { ExternalIdModule } from 'src/external-id/external-id.module';
import { MediaModule } from 'src/media/media.module';
import { ImageModule } from '../image/image.module';
import { PersonModule } from '../person/person.module';
import { GenreModule } from 'src/genre/genre.module';
import { CountryModule } from 'src/country/country.module';
import { FactModule } from 'src/fact/fact.module';
import { SeasonModule } from 'src/season/season.module';
import { ReleaseDateModule } from 'src/release-date/release-date.module';
import { RatingModule } from 'src/rating/rating.module';
import { PageInfoModule } from 'src/page-info/page-info.module';
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
