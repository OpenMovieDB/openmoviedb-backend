import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExternalIDMapper } from './external-id.mapper';
import { ExternalIDModel } from './models/external-id.model';
import { CreateExternalIDsInput } from './dto/create-external-ids.input';
import { BaseService } from '../../common/services/base.service';
import { CountriesModel } from '../country/models/countries.model';
import { FindCountriesInput } from '../country/dto/find-countries.input';
import { CreateExternalIDInput } from './dto/create-external-id.input';

@Injectable()
export class ExternalIDService extends BaseService(
  'externalID',
  ExternalIDModel,
  ExternalIDModel,
  CountriesModel,
  FindCountriesInput,
  CreateExternalIDInput,
  ExternalIDMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async findManyByMovieIds(ids: string[]): Promise<ExternalIDModel[]> {
    const externalIds = await this.prismaService.externalID.findMany({
      where: {
        movieId: {
          in: ids,
        },
      },
    });

    return externalIds.map((externalId) => new ExternalIDMapper().mapEntityToModel(externalId));
  }

  async createMany({ ids }: CreateExternalIDsInput): Promise<ExternalIDModel[]> {
    const externalIds = await this.prismaService.$transaction(
      ids.map((id) =>
        this.prismaService.externalID.create({
          data: {
            ...id,
          },
        }),
      ),
    );

    return new ExternalIDMapper().mapEntitiesToModels(externalIds);
  }
}
