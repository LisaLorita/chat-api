import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageResponse {
	@ApiProperty()
	readonly content: string;

	@ApiProperty()
	readonly senderId: string;

	@ApiProperty()
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
