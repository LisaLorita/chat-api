import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserRequest } from './dto/create-user-request.dto';
import { CreateUserResponse } from './dto/create-user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('register')
	@ApiOperation({ summary: 'Register user' })
	@ApiResponse({ type: CreateUserResponse, status: 201, description: 'User created' })
	async createUser(@Body() createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
		return this.usersService.createUser(createUserDto);
	}
}
