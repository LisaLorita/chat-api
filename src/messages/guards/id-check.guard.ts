import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';
import { CreateMessageRequest } from '../dtos/create-message-request.dto';

@Injectable()
export class IdCheckGuard implements CanActivate {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const body: CreateMessageRequest = request.body;

		const [sender, receiver] = await Promise.all([
			this.usersRepository.findOne({ where: { id: body.senderId } }),
			this.usersRepository.findOne({ where: { id: body.receiverId } }),
		]);

		if (!sender) {
			throw new BadRequestException('El usuario sender no existe');
		}

		if (!receiver) {
			throw new BadRequestException('El usuario receiver no existe');
		}

		return true;
	}
}
