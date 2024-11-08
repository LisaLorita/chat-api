import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
	@ApiProperty()
	name: string;

	@ApiProperty()
	email: string;

	constructor(name: string, email: string) {
		this.name = name;
		this.email = email;
	}

	static create(name: string, email: string): CreateUserResponse {
		return new CreateUserResponse(name, email);
	}
}
