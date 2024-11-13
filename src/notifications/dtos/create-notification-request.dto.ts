import { IsUUID } from 'class-validator';

export class CreateNotificationRequest {
	@IsUUID()
	readonly messageId: string;

	constructor(messageId: string) {
		this.messageId = messageId;
	}

	static create(messageId: string): CreateNotificationRequest {
		return new CreateNotificationRequest(messageId);
	}
}
