import { Module } from '@nestjs/common';
import { FactResolver } from './fact.resolver';
import { FactService } from './fact.service';

@Module({
  providers: [FactResolver, FactService],
  exports: [FactService],
})
export class FactModule {}
