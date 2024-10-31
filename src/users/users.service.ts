import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserRequest } from './dto/create-user-request.dto';
import { CreateUserResponse } from './dto/create-user-response.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async createUser(createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
		try {
			const userEntity = this.usersRepository.create(createUserDto);
			const createdUser = await this.usersRepository.save(userEntity);

			return CreateUserResponse.create(createdUser.name, createdUser.email);
		} catch (error) {
			if (error?.code === '23505') {
				throw new BadRequestException('El email ya está en uso');
			}
			console.log(error);
			throw new BadRequestException('Error al crear el usuario');
		}
	}
}
