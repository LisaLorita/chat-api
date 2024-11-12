import { BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

export class CheckUserExistsGuard implements CanActivate {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const userId = request.query.senderId || request.query.receiverId;

		if (!userId) {
			throw new BadRequestException('User id is required');
		}

		const user = await this.usersRepository.findOne({ where: { id: userId } });
		if (!user) {
			throw new BadRequestException(`User ${userId} not found`);
		}

		return true;
	}
}
