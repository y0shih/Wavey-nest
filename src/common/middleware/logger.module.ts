import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, rest: any, next: () => void) {
    console.log('Request...', new Date().toDateString());
    next();
  }
}
