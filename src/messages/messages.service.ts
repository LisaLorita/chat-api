import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { CreateMessageRequest } from './dtos/create-message-request.dto';
import { CreateMessageResponse } from './dtos/create-message-response.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(MessageEntity)
		private readonly messageRepository: Repository<MessageEntity>,
	) {}

	async send(request: CreateMessageRequest): Promise<CreateMessageResponse> {
		try {
			const message = this.messageRepository.create(request);
			const savedMessage = await this.messageRepository.save(message);

			return CreateMessageResponse.create(
				savedMessage.content,
				savedMessage.senderId,
				savedMessage.createdAt,
			);
		} catch (error) {
			if (error instanceof QueryFailedError) {
				if (error.message.includes('foreign key constraint')) {
					throw new BadRequestException('El remitente o el receptor no existen.');
				}
			}
		}
	}
}
