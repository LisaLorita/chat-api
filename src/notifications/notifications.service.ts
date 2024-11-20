import { Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageCreatedEvent } from '../messages/events/message-created.event';
import { GetNotificationsRequest } from './dtos/get-notifications-request.dto';
import { GetNotificationsResponse } from './dtos/get-notifications-response.dto';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly notificationsRepository: Repository<NotificationEntity>,
	) {}

	@OnEvent('message.created')
	async handleMessageCreatedEvent(event: MessageCreatedEvent): Promise<void> {
		const entity = NotificationEntity.create(event.messageId);

		const notification = this.notificationsRepository.create(entity);

		await this.notificationsRepository.save(notification);

		console.log('Notification created!');
	}

	async getByUserId(request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
		const take = request.take ?? 10;
		const page = request.page ?? 1;
		const skip = (page - 1) * take;

		const [data, count] = await this.notificationsRepository.findAndCount({
			where: { message: { receiverId: request.userId } },
			order: { createdAt: 'DESC' },
			take,
			skip,
		});

		if (data.length === 0) {
			throw new NotFoundException(`User ${request.userId} has not received any notifications`);
		}

		return GetNotificationsResponse.create(data, count);
	}
}
