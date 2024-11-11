import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateMessageRequest {
	@ApiProperty()
	@IsString()
	@Length(1, 500)
	readonly content: string;

	//No necesario cuando el usuario esta autenticado
	@ApiProperty()
	@IsUUID()
	readonly senderId: string;

	@ApiProperty()
	@IsUUID()
	readonly receiverId: string;
}
