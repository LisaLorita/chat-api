import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindUserByEmailRequest {
	@ApiProperty()
	@IsEmail()
	readonly email: string;

	constructor(email: string) {
		this.email = email;
	}

	static create(email: string): FindUserByEmailRequest {
		return new FindUserByEmailRequest(email);
	}
}
