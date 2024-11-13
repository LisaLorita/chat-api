import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageCreatedEvent } from '../messages/events/message-created.event';
import { CreateNotificationRequest } from './dtos/create-notification-request.dto';
import { CreateNotificationResponse } from './dtos/create-notification-response.dto';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly notificationsRepository: Repository<NotificationEntity>,
	) {}

	@OnEvent('message.created')
	async handleMessageCreatedEvent(event: MessageCreatedEvent): Promise<CreateNotificationResponse> {
		console.log('Event received:', event);

		const request = new CreateNotificationRequest(event.messageId);

		const notification = this.notificationsRepository.create({
			message: { id: request.messageId },
			createdAt: new Date(),
		});

		const savedNotification = await this.notificationsRepository.save(notification);

		return CreateNotificationResponse.create(
			savedNotification.id,
			savedNotification.message.id,
			savedNotification.createdAt,
		);
	}
}
