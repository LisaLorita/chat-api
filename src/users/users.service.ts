import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserRequest } from './dto/create-user-request.dto';
import { CreateUserResponse } from './dto/create-user-response.dto';
import { FindUserByFilterRequest } from './dto/find-user-by-filter-request.dto';
import { FindUserByFilterResponse } from './dto/find-user-by-filter-response.dto';
import { FindUserByIdRequest } from './dto/find-user-by-id-request.dto';
import { FindUserByIdResponse } from './dto/find-user-by-id-response.dto';
import { UpdateUserRequest } from './dto/update-user-request.dto';
import { UpdateUserResponse } from './dto/update-user-response.dto';

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

	async findById(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
		const { id } = request;
		const user = await this.usersRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException('Usuario no encontrado');
		}

		return FindUserByIdResponse.create(user);
	}

	async deleteUser(id: string): Promise<void> {
		const user = await this.usersRepository.findOne({ where: { id } });

		if (!user) {
			throw new NotFoundException('Usuario no encontrado');
		}
		await this.usersRepository.remove(user);
	}

	async updateUser(id: string, request: UpdateUserRequest): Promise<UpdateUserResponse> {
		try {
			const user = await this.usersRepository.preload({
				id,
				...request,
			});
			if (!user) {
				throw new NotFoundException('Usuario no encontrado');
			}

			const updatedUser = await this.usersRepository.save(user);

			return UpdateUserResponse.create(updatedUser);
		} catch (error) {
			if (error?.code === '23505') {
				throw new BadRequestException('El email ya está en uso');
			}
			console.log(error);
			throw new BadRequestException('Error al actualizar el usuario');
		}
	}

	async findMany(filter: FindUserByFilterRequest): Promise<FindUserByFilterResponse[]> {
		const { name, email, isActive } = filter;
		const query = this.usersRepository.createQueryBuilder('user');

		if (name) {
			query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
		}

		if (email) {
			query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
		}

		if (isActive !== undefined) {
			query.andWhere('user.isActive = :isActive', { isActive });
		}
		const users = await query.getMany();

		return users.map((user) => FindUserByFilterResponse.create(user));
	}
}
