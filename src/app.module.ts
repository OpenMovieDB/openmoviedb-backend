import { Logger, Module } from '@nestjs/common';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './common/configs/gql-config.service';
import config from './common/configs/config';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';
import { MovieModule } from './domains/movie/movie.module';
import { PersonModule } from './domains/person/person.module';
import { GenreModule } from './domains/genre/genre.module';
import { CountryModule } from './domains/country/country.module';
import { ExternalIdModule } from './domains/external-id/external-id.module';
import { RatingModule } from './domains/rating/rating.module';
import { FactModule } from './domains/fact/fact.module';
import { SeasonModule } from './domains/season/season.module';
import { ReleaseDateModule } from './domains/release-date/release-date.module';
import { SeoModule } from './domains/seo/seo.module';
import { ImageModule } from './domains/image/image.module';
import { MediaModule } from './domains/media/media.module';
import { CollectionModule } from './domains/collection/collection.module';
import { PageModule } from './domains/page/page.module';
import { SliderModule } from './domains/slider/slider.module';
import { BlockModule } from './domains/block/block.module';
import { FileModule } from './domains/file/file.module';
import { SyncModule } from './services/sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UsersModule,
    MovieModule,
    PersonModule,
    GenreModule,
    CountryModule,
    ExternalIdModule,
    RatingModule,
    FactModule,
    SeasonModule,
    ReleaseDateModule,
    SeoModule,
    ImageModule,
    MediaModule,
    CollectionModule,
    PageModule,
    SliderModule,
    BlockModule,
    FileModule,
    SyncModule,
  ],
})
export class AppModule {}
