import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GetSentMessagesRequest {
	@IsUUID()
	@IsNotEmpty()
	readonly senderId: string;

	@IsOptional()
	readonly take?: number;

	@IsOptional()
	readonly page?: number;
}
