import { IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from '../../users/entities/user.entity';

export class AuthenticatedUser {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsString()
	name: string;

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
