import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInRequest } from './dtos/sign-in-request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

    }