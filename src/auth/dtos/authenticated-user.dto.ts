import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { FindUserByEmailResponse } from '../../users/dtos/find-by-email-response.dto';

export class AuthenticatedUser {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	id: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	constructor(user: FindUserByEmailResponse) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
	}

	static create(user: FindUserByEmailResponse): AuthenticatedUser {
		return new AuthenticatedUser(user);
	}
}
