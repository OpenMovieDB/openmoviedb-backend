import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SliderModel } from './models/slider.model';
import { SliderMapper } from './slider.mapper';
import { FindSlidersInput } from './dto/find-slider.input';
import { SlidersModel } from './models/sliders.model';
import { BaseService } from '../common/services/base.service';
import { CreateSliderInput } from './dto/create-slider.input';

@Injectable()
export class SliderService extends BaseService(
  'slider',
  SliderModel,
  SliderModel,
  SlidersModel,
  FindSlidersInput,
  CreateSliderInput,
  SliderMapper,
) {
  constructor(readonly prismaService: PrismaService) {
    super(prismaService);
  }
}
