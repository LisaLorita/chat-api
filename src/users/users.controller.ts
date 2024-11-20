import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CheckOwnerGuard } from '../auth/guards/check-owner.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateUserRequest } from './dtos/create-user-request.dto';
import { CreateUserResponse } from './dtos/create-user-response.dto';
import { FindUserByIdRequest } from './dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from './dtos/find-user-by-id-response.dto';
import { FindUsersByFilterRequest } from './dtos/find-users-by-filter-request.dto';
import { FindUsersByFilterResponse } from './dtos/find-users-by-filter-response.dto';
import { UpdateUserRequest } from './dtos/update-user-request.dto';
import { UpdateUserResponse } from './dtos/update-user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Register user' })
	@ApiResponse({ type: CreateUserResponse, status: 201, description: 'User created' })
	async createUser(@Body() createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
		return this.usersService.createUser(createUserDto);
	}

	@Get()
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Find user by filters' })
	@ApiResponse({
		type: FindUsersByFilterResponse,
		isArray: true,
		status: 200,
		description: 'Users found by filters',
	})
	async findMany(@Query() request: FindUsersByFilterRequest): Promise<FindUsersByFilterResponse> {
		return await this.usersService.findMany(request);
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Find user by id' })
	@ApiResponse({ type: FindUserByIdResponse, status: 200, description: 'User found' })
	async findById(@Param('id') id: string): Promise<FindUserByIdResponse> {
		const request = FindUserByIdRequest.create(id);

		return await this.usersService.findById(request);
	}

	@Delete(':id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete user by id' })
	@ApiResponse({ status: 200, description: 'User deleted' })
	async deleteUser(@Param('id') id: string): Promise<void> {
		return this.usersService.deleteUser(id);
	}

	@Patch(':id')
	@UseGuards(JwtGuard, CheckOwnerGuard)
	@ApiOperation({ summary: 'Update user by id' })
	@ApiResponse({ type: UpdateUserRequest, status: 200, description: 'User updated' })
	async updateUser(
		@Param('id') id: string,
		@Body() request: UpdateUserRequest,
	): Promise<UpdateUserResponse> {
		return await this.usersService.updateUser(id, request);
	}
}
