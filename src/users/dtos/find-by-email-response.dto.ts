import { UserEntity } from '../entities/user.entity';

export class FindUserByEmailResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly password: string;

	constructor(id: string, name: string, email: string, password: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static create(foundUser: UserEntity): FindUserByEmailResponse {
		const { id, name, email, password } = foundUser;

		return new FindUserByEmailResponse(id, name, email, password);
	}
}
