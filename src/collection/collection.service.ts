import { Injectable } from '@nestjs/common';
import { CollectionModel } from './models/collection.model';
import { FindCollectionsInput } from './dto/find-collections.input';
import { CollectionMapper } from './collection.mapper';
import { CreateCollectionInput } from './dto/create-collection.input';
import { PrismaService } from 'nestjs-prisma';
import { CollectionsModel } from './models/collections.model';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class CollectionService extends BaseService(
  'collection',
  CollectionModel,
  CollectionModel,
  CollectionsModel,
  FindCollectionsInput,
  CreateCollectionInput,
  CollectionMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }
}
