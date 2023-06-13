import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SlideModel } from './models/slide.model';
import { SlideMapper } from './slide.mapper';
import { FindSlidesInput } from './dto/find-slides.input';
import { SlidesModel } from './models/slides.model';
import { BaseService } from '../common/services/base.service';
import { CreateSlideInput } from './dto/create-slide.input';

@Injectable()
export class SlideService extends BaseService(
  'slide',
  SlideModel,
  SlideModel,
  SlidesModel,
  FindSlidesInput,
  CreateSlideInput,
  SlideMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async findManyBySliderIds(ids: string[]): Promise<SlideModel[]> {
    const slides = await this.prismaService.slide.findMany({
      where: {
        sliderId: {
          in: ids,
        },
      },
    });

    return slides.map((slide) => new SlideMapper().mapEntityToModel(slide));
  }
}
