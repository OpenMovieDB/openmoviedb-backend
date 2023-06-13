// @ts-nocheck
import { PaginationArgs } from '../pagination/pagination.args';
import { PrismaService } from 'nestjs-prisma';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

type Constructor<T> = new (...args: any[]) => T;

export function BaseService<T, TModel, TPaginationModel, TPaginationDto, TCreateDto, TUpdateDto, TMapper>(
  model: string,
  Model: Constructor<TModel>,
  PaginationModel: Constructor<TPaginationModel>,
  PaginationDto: Constructor<TPaginationDto>,
  CreateDto: Constructor<TCreateDto>,
  UpdateDto: Constructor<TUpdateDto>,
  Mapper: Constructor<TMapper>,
) {
  abstract class BaseAbstractService {
    protected constructor(readonly prismaService: PrismaService) {}

    async findOne(id: string): Promise<TModel> {
      const block = await this.prismaService[model].findUnique({
        where: { id },
      });

      return new Mapper().mapEntityToModel(block);
    }

    async findMany({ after, before, first, last }: PaginationArgs, where: TPaginationDto): Promise<TPaginationModel> {
      const res = await findManyCursorConnection(
        (args) => this.prismaService[model].findMany({ where }),
        () => this.prismaService[model].count({ where }),
        { after, before, first, last },
      );

      return {
        ...res,
        edges: res.edges.map((edge) => ({
          ...edge,
          node: new Mapper().mapEntityToModel(edge.node),
        })),
      };
    }

    async create(data: TCreateDto): Promise<TModel> {
      const block = await this.prismaService[model].create({
        data: {
          ...data,
        },
      });

      return new Mapper().mapEntityToModel(block);
    }

    async update(id: string, data: TUpdateDto): Promise<TModel> {
      const block = await this.prismaService[model].update({
        where: { id },
        data: {
          ...data,
        },
      });

      return new Mapper().mapEntityToModel(block);
    }

    async delete(id: string): Promise<boolean> {
      try {
        await this.prismaService[model].delete({
          where: { id },
        });
      } catch (e) {
        return false;
      }

      return true;
    }
  }

  return BaseAbstractService;
}
