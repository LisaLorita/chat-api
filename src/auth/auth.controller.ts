import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';
import { AuthenticatedUser } from './dtos/authenticated-user.dto';
import { CreateUserJwtResponse } from './dtos/create-user-jwt-response.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login user' })
	@ApiResponse({
		status: 201,
		description: 'User authenticated',
		schema: {
			type: 'object',
			properties: {
				AuthenticatedUser: { type: 'object' },
				accessToken: { type: 'string' },
			},
		},
	})
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalGuard)
	@Post('login')
	async login(@AuthUser() authUser: AuthenticatedUser): Promise<CreateUserJwtResponse> {
		return this.authService.createJwt(authUser);
	}

	@UseGuards(JwtGuard)
	@Post('refresh-token')
	async refreshToken(@AuthUser() authUser: AuthenticatedUser): Promise<CreateUserJwtResponse> {
		return this.authService.createJwt(authUser);
	}
}
