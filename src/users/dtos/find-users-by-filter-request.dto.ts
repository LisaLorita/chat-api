import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FindUsersByFilterRequest {
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
	@Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : value))
	isActive?: boolean;

	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	take?: number;

	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	page?: number;
}
