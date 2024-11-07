import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
	@Transform(({ value }) => value === 'true') // Convert string to boolean
	isActive?: boolean;
}
