import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

export class FindUserByIdResponse {
	@ApiProperty()
	readonly id: string;

	@ApiProperty()
	readonly name: string;

	@ApiProperty()
	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(foundUser: UserEntity): FindUserByIdResponse {
		const { id, name, email } = foundUser;

		return new FindUserByIdResponse(id, name, email);
	}
}
