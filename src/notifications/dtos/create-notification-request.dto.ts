import { IsUUID } from 'class-validator';

export class CreateNotificationRequest {
	@IsUUID()
	readonly messageId: string;

	constructor(idMessage: string) {
		this.messageId = idMessage;
	}
}
