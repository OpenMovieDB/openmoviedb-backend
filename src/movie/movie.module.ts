import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import MoviesLoader from './movie.loader';
import { ExternalIdModule } from 'src/external-id/external-id.module';
import { MediaModule } from 'src/media/media.module';
import { ImageModule } from '../image/image.module';
import { PersonModule } from '../person/person.module';
import { GenreModule } from 'src/genre/genre.module';

@Module({
  imports: [ExternalIdModule, MediaModule, ImageModule, PersonModule, GenreModule],
  providers: [MovieResolver, MovieService, MoviesLoader],
})
export class MovieModule {}
