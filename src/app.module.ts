import { Logger, Module } from '@nestjs/common';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './common/configs/gql-config.service';
import config from './common/configs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { PersonModule } from './person/person.module';
import { GenreModule } from './genre/genre.module';
import { CountryModule } from './country/country.module';
import { ExternalIdModule } from './external-id/external-id.module';
import { RatingModule } from './rating/rating.module';
import { FactModule } from './fact/fact.module';
import { SeasonModule } from './season/season.module';
import { EpisodeModule } from './episode/episode.module';
import { ReleaseDateModule } from './release-date/release-date.module';
import { PageInfoModule } from './page-info/page-info.module';
import { SeoModule } from './seo/seo.module';
import { ImageModule } from './image/image.module';
import { MediaModule } from './media/media.module';
import { CollectionModule } from './collection/collection.module';
import { Service } from './.service';
import { PageModule } from './page/page.module';
import { SliderModule } from './slider/slider.module';
import { BlockModule } from './block/block.module';

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
    EpisodeModule,
    ReleaseDateModule,
    PageInfoModule,
    SeoModule,
    ImageModule,
    MediaModule,
    CollectionModule,
    PageModule,
    SliderModule,
    BlockModule,
  ],
  providers: [Service],
})
export class AppModule {}
