import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserRequest } from './dtos/create-user-request.dto';
import { CreateUserResponse } from './dtos/create-user-response.dto';
import { FindUserByIdRequest } from './dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from './dtos/find-user-by-id-response.dto';
import { FindUsersByFilterRequest } from './dtos/find-users-by-filter-request.dto';
import { FindUsersByFilterResponse } from './dtos/find-users-by-filter-response.dto';
import { UpdateUserRequest } from './dtos/update-user-request.dto';
import { UpdateUserResponse } from './dtos/update-user-response.dto';

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

	async findMany(request: FindUsersByFilterRequest): Promise<FindUsersByFilterResponse> {
		const { name, email, isActive } = request;
		const query = this.usersRepository.createQueryBuilder('user');

		if (name) {
			query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
		}

		if (email) {
			query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
		}

		if (isActive) {
			query.andWhere('user.isActive = :isActive', { isActive });
		}

		const take = request.take ?? 10;
		const page = request.page ?? 1;
		const skip = (page - 1) * take;

		query.take(take);
		query.skip(skip);

		const [data, count] = await query.getManyAndCount();

		return FindUsersByFilterResponse.create(data, count);
	}
}
