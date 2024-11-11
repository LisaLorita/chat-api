export class CreateMessageResponse {
	readonly content: string;
	readonly senderId: string;
	readonly createdAt: Date;

	constructor(content: string, senderId: string, createdAt: Date) {
		this.content = content;
		this.senderId = senderId;
		this.createdAt = createdAt;
	}

	static create(content: string, senderId: string, createdAt: Date): CreateMessageResponse {
		return new CreateMessageResponse(content, senderId, createdAt);
	}
}
