import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { BlockService } from 'src/block/block.service';
import { SlideService } from 'src/slide/slide.service';

@Injectable({ scope: Scope.REQUEST })
export default class SlidersLoader {
  constructor(private readonly slideService: SlideService) {}

  public readonly batchSlides = new DataLoader(async (ids: string[]) => {
    const res = await this.slideService.findManyBySliderIds(ids);
    return ids.map((id) => res.filter((item) => item.id === id));
  });
}
