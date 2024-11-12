import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageRequest } from './dtos/create-message-request.dto';
import { CreateMessageResponse } from './dtos/create-message-response.dto';
import { GetReceivedMessagesRequest } from './dtos/get-received-messages-request.dto';
import { GetReceivedMessagesResponse } from './dtos/get-received-messages-response.dto';
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

	async getSent(request: GetSentMessagesRequest): Promise<GetSentMessagesResponse> {
		return this.getMessages(request.senderId, 'senderId', request.take, request.page);
	}

	async getReceived(request: GetReceivedMessagesRequest): Promise<GetReceivedMessagesResponse> {
		return this.getMessages(request.receiverId, 'receiverId', request.take, request.page);
	}

	private async getMessages(
		userId: string,
		userField: 'senderId' | 'receiverId',
		take = 10,
		page = 1,
	): Promise<GetSentMessagesResponse | GetReceivedMessagesResponse> {
		const skip = (page - 1) * take;

		const [data, count] = await this.messageRepository.findAndCount({
			where: { [userField]: userId },
			order: { createdAt: 'DESC' },
			take,
			skip,
		});

		if (data.length === 0) {
			throw new NotFoundException(
				`User ${userId} has not ${userField === 'senderId' ? 'sent' : 'received'} any messages`,
			);
		}

		return userField === 'senderId'
			? GetSentMessagesResponse.create(data, count)
			: GetReceivedMessagesResponse.create(data, count);
	}
}
