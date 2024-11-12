import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageRequest } from './dtos/create-message-request.dto';
import { CreateMessageResponse } from './dtos/create-message-response.dto';
import { GetSentMessagesRequest } from './dtos/get-sent-messages-request.dto';
import { GetSentMessagesResponse } from './dtos/get-sent-messages-response.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(MessageEntity)
		private readonly messageRepository: Repository<MessageEntity>,
	) {}

	async send(request: CreateMessageRequest): Promise<CreateMessageResponse> {
		const message = this.messageRepository.create(request);
		const savedMessage = await this.messageRepository.save(message);

		return CreateMessageResponse.create(
			savedMessage.content,
			savedMessage.senderId,
			savedMessage.createdAt,
		);
	}

	async getSentMessages(request: GetSentMessagesRequest): Promise<GetSentMessagesResponse> {
		const take = request.take ?? 10;
		const page = request.page ?? 1;
		const skip = (page - 1) * take;

		const [data, count] = await this.messageRepository.findAndCount({
			where: { senderId: request.senderId },
			order: { createdAt: 'DESC' },
			take,
			skip,
		});

		if (data.length === 0) {
			throw new NotFoundException(`User ${request.senderId} has not sent any messages`);
		}

		return GetSentMessagesResponse.create(data, count);
	}
}
