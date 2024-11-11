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
}
