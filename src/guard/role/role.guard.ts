import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import type { Request } from 'express';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 在这里进行角色验证逻辑
    const admin = this.reflector.get<Array<string>>(
      'role',
      context.getHandler(),
    ); // 获取处理器上的roles装饰器
    const req = context.switchToHttp().getRequest<Request>();
    console.log('经过guard', admin);
    if (admin === undefined) {
      return false;
    }
    // 例如，从请求中获取用户的角色，并检查其是否具有所需的权限
    return admin.includes(req.query.role as string); // 假设所有用户都有权限访问资源
  }
}
