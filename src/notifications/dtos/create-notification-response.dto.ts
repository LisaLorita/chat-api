import { IsDate, IsUUID } from 'class-validator';

export class CreateNotificationResponse {
	@IsUUID()
	readonly id: string;

	@IsUUID()
	readonly messageId: string;

	@IsDate()
	readonly createdAt: Date;

	constructor(id: string, messageId: string, createdAt: Date) {
		this.id = id;
		this.messageId = messageId;
		this.createdAt = createdAt;
	}

	static create(id: string, messageId: string, createdAt: Date): CreateNotificationResponse {
		return new CreateNotificationResponse(id, messageId, createdAt);
	}
}
