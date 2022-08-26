import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthenticatedRequest } from '../auth.interfaces'

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    return request.user
  }
)
