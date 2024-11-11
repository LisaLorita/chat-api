import { IsString, IsUUID, Length } from 'class-validator';

export class CreateMessageRequest {
	@IsString()
	@Length(1, 500)
	readonly content: string;

	//No necesario cuando el usuario esta autenticado
	@IsUUID()
	readonly senderId: string;

	@IsUUID()
	readonly receiverId: string;

	constructor(content: string, senderId: string, receiverId: string) {
		this.content = content;
		this.senderId = senderId;
		this.receiverId = receiverId;
	}

	static create(content: string, senderId: string, receiverId: string): CreateMessageRequest {
		return new CreateMessageRequest(content, senderId, receiverId);
	}
}
