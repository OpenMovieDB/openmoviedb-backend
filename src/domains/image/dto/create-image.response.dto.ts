import { ApiProperty } from '@nestjs/swagger';

export class CreateImageResponseDto {
  @ApiProperty({ isArray: true })
  ids: string[];
}
