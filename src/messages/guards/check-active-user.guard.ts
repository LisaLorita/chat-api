import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class CheckActiveUserGuard implements CanActivate {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { receiverId } = request.body;

		const activeReceiver = await this.usersRepository.findOne({
			where: { id: receiverId, isActive: true },
		});

		if (!activeReceiver) {
			throw new BadRequestException('El usuario receiver no está activo');
		}

		return true;
	}
}
