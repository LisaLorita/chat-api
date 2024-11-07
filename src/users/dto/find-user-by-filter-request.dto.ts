import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class FindUserByFilterRequest {
	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}
