import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageCreatedEvent } from '../messages/events/message-created.event';
import { CreateNotificationRequest } from './dtos/create-notification-request.dto';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(NotificationEntity)
		private readonly notificationsRepository: Repository<NotificationEntity>,
	) {}

	@OnEvent('message.created')
	async handleMessageCreatedEvent(event: MessageCreatedEvent): Promise<void> {
		const request = CreateNotificationRequest.create(event.messageId);

		const notification = this.notificationsRepository.create({
			message: { id: request.messageId },
		});

		await this.notificationsRepository.save(notification);
	}
}
