import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { NotificationEntity } from './entities/notification.entity';
import NotificationsController from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
	imports: [TypeOrmModule.forFeature([NotificationEntity]), UsersModule],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
