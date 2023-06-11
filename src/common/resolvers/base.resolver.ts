// @ts-nocheck
import { Args, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../pagination/pagination.args';

type Constructor<T> = new (...args: any[]) => T;

export function BaseResolver<T, TModel, TPaginationModel, TPaginationDto, TCreateDto, TUpdateDto, TService>(
  suffix: string,
  Model: Constructor<TModel>,
  PaginationModel: Constructor<TPaginationModel>,
  PaginationDto: Constructor<TPaginationDto>,
  CreateDto: Constructor<TCreateDto>,
  UpdateDto: Constructor<TUpdateDto>,
  Service: Constructor<TService>,
) {
  @InputType(`${suffix}PaginationDto`, { isAbstract: true })
  class InputTypePaginationDto extends PaginationDto {}

  @InputType(`${suffix}CreateDto`, { isAbstract: true })
  class InputTypeCreateDto extends CreateDto {}

  @InputType(`${suffix}UpdateDto`, { isAbstract: true })
  class InputTypeUpdateDto extends UpdateDto {}

  @ObjectType(`${suffix}PaginationModel`, { isAbstract: true })
  class ObjectTypePaginationModel extends PaginationModel {}

  @Resolver({ isAbstract: true })
  abstract class BaseAbstractResolver {
    protected constructor(readonly service: TService) {}

    @Query(() => Model, { name: `findOne${suffix}` })
    async findOne(@Args('id') id: string): Promise<TModel> {
      return this.service.findOne(id);
    }

    @Query(() => ObjectTypePaginationModel, { name: `findMany${suffix}` })
    async findMany(
      @Args() pagination: PaginationArgs,
      @Args('data') dto: InputTypePaginationDto,
    ): Promise<TPaginationModel> {
      return this.service.findMany(pagination);
    }

    @Mutation(() => Model, { name: `create${suffix}` })
    async create(@Args('data') dto: InputTypeCreateDto): Promise<TModel> {
      return this.service.create(dto);
    }

    @Mutation(() => Model, { name: `update${suffix}` })
    async update(@Args('id') id: string, @Args('data') dto: InputTypeUpdateDto): Promise<TModel> {
      return this.service.update(id, dto);
    }

    @Mutation(() => Model, { name: `delete${suffix}` })
    async delete(@Args('id') id: string): Promise<boolean> {
      return this.service.delete(id);
    }
  }

  return BaseAbstractResolver;
}
