import { Module } from '@nestjs/common';
import { PageInfoResolver } from './page-info.resolver';
import { PageInfoService } from './page-info.service';

@Module({
  providers: [PageInfoResolver, PageInfoService]
})
export class PageInfoModule {}
