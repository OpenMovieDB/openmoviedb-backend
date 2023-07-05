import { Module } from '@nestjs/common';
import { CollectionResolver } from './collection.resolver';
import { CollectionService } from './collection.service';
import CollectionsLoader from './collection.loader';
import { BlockModule } from '../block/block.module';
import { PageInfoModule } from '../page-info/page-info.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [BlockModule, PageInfoModule, ImageModule],
  providers: [CollectionResolver, CollectionService, CollectionsLoader],
  exports: [CollectionService],
})
export class CollectionModule {}
