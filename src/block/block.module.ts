import { Module } from '@nestjs/common';
import { BlockResolver } from './block.resolver';
import { BlockService } from './block.service';
import BlocksLoader from './block.loader';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [ImageModule],
  providers: [BlockResolver, BlockService, BlocksLoader],
  exports: [BlockService],
})
export class BlockModule {}
