import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { PrismaModule } from 'nestjs-prisma';
import { KpMovieConverter } from 'src/services/sync/converters/kp-movie.converter';

@Module({
  imports: [PrismaModule],
  providers: [SyncService, KpMovieConverter],
})
export class SyncModule {}
