import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [TypeOrmModule, AuthService, JwtModule],
})
export class AuthModule {}
