import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { UsersService } from '../../users/users.service';

@Injectable()
export class CheckOwnerGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const authUserId = request.authUser.id;
		const ownerId =
			request.params.id ||
			request.body.senderId ||
			request.query.senderId ||
			request.query.receiverId;

		if (authUserId !== ownerId) {
			throw new ForbiddenException('You are not allowed to access this resource');
		}

		return true;
	}
}
