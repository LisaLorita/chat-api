import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthenticatedUser } from './dtos/authenticated-user.dto';
import { LoginUserRequest } from './dtos/login-user-request.dto';

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
	@Post('login')
	async login(@Body() request: LoginUserRequest): Promise<{
		authenticatedUser: AuthenticatedUser;
		accessToken: string;
	}> {
		return this.authService.login(request);
	}
}
