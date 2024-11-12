import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GetReceivedMessagesRequest {
	@IsUUID()
	@IsNotEmpty()
	readonly receiverId: string;

	@IsOptional()
	readonly take?: number;

	@IsOptional()
	readonly page?: number;
}
