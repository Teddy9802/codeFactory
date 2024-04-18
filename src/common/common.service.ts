import { Injectable } from '@nestjs/common';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { BaseModel } from 'src/common/entity/base.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CommonService {
  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {}
    path: string
  ) {}
}
