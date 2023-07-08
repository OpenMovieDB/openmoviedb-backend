import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { PrismaModule } from 'nestjs-prisma';
import { KpMovieConverter } from 'src/services/sync/converters/kp-movie.converter';
import { ImageModule } from 'src/domains/image/image.module';

@Module({
  imports: [PrismaModule, ImageModule],
  providers: [SyncService, KpMovieConverter],
})
export class SyncModule {}
