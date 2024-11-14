import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { GetNotificationsRequest } from './dtos/get-notifications-request.dto';
import { GetNotificationsResponse } from './dtos/get-notifications-response.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Get(':userId')
	@UseGuards(UserExistsGuard)
	async get(@Param() request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
		return this.notificationsService.getByUserId(request);
	}
}

export default NotificationsController;
