import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

export class FindUserByFilterResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	isActive: boolean;

	constructor(id: string, name: string, email: string, isActive: boolean) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.isActive = isActive;
	}

	static create(foundUser: UserEntity): FindUserByFilterResponse {
		const { id, name, email, isActive } = foundUser;

		return new FindUserByFilterResponse(id, name, email, isActive);
	}
}
