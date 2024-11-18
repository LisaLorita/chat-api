import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from '../../users/entities/user.entity';

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

	constructor(user: UserEntity) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
	}

	static create(user: UserEntity): AuthenticatedUser {
		return new AuthenticatedUser(user);
	}
}
