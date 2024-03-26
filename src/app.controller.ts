import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

// 컨트롤러 뒤에 괄호안은 접두어 역할을 함.
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
