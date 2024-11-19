import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { FindUserByIdRequest } from '../../users/dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../../users/dtos/find-user-by-id-response.dto';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: JwtPayload): Promise<FindUserByIdResponse> {
		const request = FindUserByIdRequest.create(payload.id);

		return this.usersService.findById(request);
	}
}
