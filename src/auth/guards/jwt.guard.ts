/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthenticatedUser } from '../dtos/authenticated-user.dto';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	// @ts-ignore
	handleRequest(
		error: unknown,
		user: AuthenticatedUser,
		info: unknown,
		executionContext: ExecutionContext,
	): boolean {
		const request = executionContext.switchToHttp().getRequest();

		if (error) {
			throw error;
		}

		if (!user) {
			throw new UnauthorizedException('invalid credentials guard');
		}

		request.authUser = user;

		return true;
	}
}
