import { IsOptional, IsUUID } from 'class-validator';

export class GetNotificationsRequest {
	@IsUUID()
	readonly userId: string;

	@IsOptional()
	readonly take?: number;

	@IsOptional()
	readonly page?: number;
}
