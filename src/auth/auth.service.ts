import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { AuthenticatedUser } from './dtos/authenticated-user.dto';
import { LoginUserRequest } from './dtos/login-user-request.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) {}

	async login(
		request: LoginUserRequest,
	): Promise<{ authenticatedUser: AuthenticatedUser; accessToken: string }> {
		const { password, email } = request;
		const user = await this.getUser(email);
		if (!(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException('invalid credentials');
		}
		const authenticatedUser = AuthenticatedUser.create(user);
		const accessToken = this.generateToken({ id: user.id });

		return { authenticatedUser, accessToken };
	}

	private async getUser(email: string): Promise<UserEntity> {
		const user = await this.usersRepository.findOne({
			where: { email },
			select: ['id', 'name', 'email', 'password'],
		});
		if (!user) {
			throw new UnauthorizedException('Usuario no encontrado');
		}

		return user;
	}

	private generateToken(payload: JwtPayload): string {
		const accessToken = this.jwtService.sign(payload);

		return accessToken;
	}
}
