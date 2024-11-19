import { ApiProperty } from '@nestjs/swagger';

import { AuthenticatedUser } from './authenticated-user.dto';

export class CreateUserJwtResponse {
	@ApiProperty()
	authenticatedUser: AuthenticatedUser;

	@ApiProperty()
	accessToken: string;

	@ApiProperty()
	refreshToken: string;

	constructor(authenticatedUser: AuthenticatedUser, accessToken: string, refreshToken: string) {
		this.authenticatedUser = authenticatedUser;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	static create(
		authenticatedUser: AuthenticatedUser,
		accessToken: string,
		refreshToken: string,
	): CreateUserJwtResponse {
		return new CreateUserJwtResponse(authenticatedUser, accessToken, refreshToken);
	}
}
