import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	readonly isActive?: boolean;
}
