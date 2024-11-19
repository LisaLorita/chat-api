import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AuthenticatedUser } from './dtos/authenticated-user.dto';
import { CreateUserJwtResponse } from './dtos/create-user-jwt-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	async createJwt(authenticatedUser: AuthenticatedUser): Promise<CreateUserJwtResponse> {
		const accessToken = this.generateToken({ id: authenticatedUser.id }, '5m');
		const refreshToken = this.generateToken({ id: authenticatedUser.id }, '1h');

		return CreateUserJwtResponse.create(authenticatedUser, accessToken, refreshToken);
	}

	async authenticateUser(email: string, password: string): Promise<AuthenticatedUser> {
		const user = await this.usersService.findByEmail({ email });
		const isAuthenticatedPassword = await bcrypt.compare(password, user.password);
		if (!isAuthenticatedPassword) {
			throw new UnauthorizedException('invalid credentials');
		}

		return AuthenticatedUser.create(user);
	}

	private generateToken(payload: JwtPayload, expiresIn: string): string {
		const options = { expiresIn } as JwtSignOptions;

		return this.jwtService.sign(payload, options);
	}
}
