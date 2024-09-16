import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';

export const GetUser = createParamDecorator<unknown, ExecutionContext, User>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
