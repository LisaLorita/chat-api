import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class GetNotificationsRequest {
	@ApiProperty()
	@IsUUID()
	readonly id: string;

	@ApiProperty()
	@IsOptional()
	readonly take?: number;

	@ApiProperty()
	@IsOptional()
	readonly page?: number;
}
