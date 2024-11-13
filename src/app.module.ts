import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';

dotenv.config();

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: true,
			autoLoadEntities: true,
			logging: true,
		}),
		UsersModule,
		MessagesModule,
		NotificationsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
