import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { PrismaModule } from 'nestjs-prisma';
import { MovieConverter } from 'src/services/sync/converters/movie.converter';

@Module({
  imports: [PrismaModule],
  providers: [SyncService, MovieConverter],
})
export class SyncModule {}
