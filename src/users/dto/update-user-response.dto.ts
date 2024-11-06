import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

export class UpdateUserResponse {
	@ApiProperty()
	readonly id: string;

	@ApiProperty()
	readonly name: string;

	@ApiProperty()
	readonly email: string;

	@ApiProperty()
	readonly isActive: boolean;

	constructor(id: string, name: string, email: string, isActive: boolean) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.isActive = isActive;
	}

	static create(updatedUser: UserEntity): UpdateUserResponse {
		const { id, name, email, isActive } = updatedUser;

		return new UpdateUserResponse(id, name, email, isActive);
	}
}
