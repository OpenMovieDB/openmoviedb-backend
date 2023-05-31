import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExternalIDMapper } from './external-id.mapper';
import { ExternalIDModel } from './models/external-id.model';
import { CreateExternalIdsInput } from './dto/create-external-ids.input';

@Injectable()
export class ExternalIdService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async createMany({ ids }: CreateExternalIdsInput): Promise<ExternalIDModel[]> {
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
