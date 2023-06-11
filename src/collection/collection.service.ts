import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { CollectionModel } from './models/collection.model';
import { FindCollectionsInput } from './dto/find-collections.input';
import { CollectionMapper } from './collection.mapper';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreateCollectionInput } from './dto/create-collection.input';
import { PrismaService } from 'nestjs-prisma';
import { CollectionsModel } from './models/collections.model';

@Injectable()
export class CollectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<CollectionModel> {
    const collection = await this.prismaService.collection.findUnique({
      where: { id },
    });

    return new CollectionMapper().mapEntityToModel(collection);
  }

  async findMany(
    { after, before, first, last }: PaginationArgs,
    where: FindCollectionsInput,
  ): Promise<CollectionsModel> {
    const res = await findManyCursorConnection(
      (args) => this.prismaService.collection.findMany({ where }),
      () => this.prismaService.collection.count({ where }),
      { after, before, first, last },
    );

    return {
      ...res,
      edges: res.edges.map((edge) => ({
        ...edge,
        node: new CollectionMapper().mapEntityToModel(edge.node),
      })),
    };
  }

  async create(data: CreateCollectionInput): Promise<CollectionModel> {
    const collection = await this.prismaService.collection.create({
      data: {
        ...data,
        pageInfo: {
          create: {
            title: null,
            description: null,
          },
        },
      },
    });

    return new CollectionMapper().mapEntityToModel(collection);
  }

  async update(id: string, data: CreateCollectionInput): Promise<CollectionModel> {
    const collection = await this.prismaService.collection.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return new CollectionMapper().mapEntityToModel(collection);
  }
}
