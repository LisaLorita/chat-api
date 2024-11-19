import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(email: string, password: string): Promise<AuthenticatedUser> {
		return this.authService.authenticateUser(email, password);
	}
}
