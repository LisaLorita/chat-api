import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FindUserByFilterRequest {
	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}
