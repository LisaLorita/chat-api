import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	constructor(name: string, email: string) {
		this.name = name;
		this.email = email;
	}

	static create(name?: string, email?: string): UpdateUserRequest {
		return new UpdateUserRequest(name, email);
	}
}
