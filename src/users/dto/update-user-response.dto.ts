import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponse {
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

	static create(id: string, name: string, email: string): UpdateUserResponse {
		return new UpdateUserResponse(id, name, email);
	}
}
