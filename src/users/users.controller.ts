import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserRequest } from './dto/create-user-request.dto';
import { CreateUserResponse } from './dto/create-user-response.dto';
import { FindUserByIdRequest } from './dto/find-user-by-id-request.dto';
import { FindUserByIdResponse } from './dto/find-user-by-id-response.dto';
import { UpdateUserRequest } from './dto/update-user-request.dto';
import { UpdateUserResponse } from './dto/update-user-response.dto';
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

	@Get(':id')
	@ApiOperation({ summary: 'Find user by id' })
	@ApiResponse({ type: FindUserByIdResponse, status: 200, description: 'User found' })
	async findById(@Param('id') id: string): Promise<FindUserByIdResponse> {
		const request = FindUserByIdRequest.create(id);

		return await this.usersService.findById(request);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update user by id' })
	@ApiResponse({ type: UpdateUserRequest, status: 200, description: 'User updated' })
	async updateUser(
		@Param('id') id: string,
		@Body() request: UpdateUserRequest,
	): Promise<UpdateUserResponse> {
		return await this.usersService.updateUser(id, request);
	}
}
