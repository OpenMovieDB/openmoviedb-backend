import { Module } from '@nestjs/common';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';

@Module({
  providers: [PersonResolver, PersonService],
  exports: [PersonService],
})
export class PersonModule {}
