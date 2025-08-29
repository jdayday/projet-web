
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AtGuard } from './at.guard'; 

@Injectable()
export class AdminGuard extends AtGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isActivated = await super.canActivate(context);
    if (!isActivated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User object in AdminGuard:', user);
    return user?.role === 'ADMIN';
  }
}