import { Controller, Get, Param } from '@nestjs/common';

import { GetNotificationsRequest } from './dtos/get-notifications-request.dto';
import { GetNotificationsResponse } from './dtos/get-notifications-response.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Get(':userId')
	async get(@Param() request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
		return this.notificationsService.getByUserId(request);
	}
}

export default NotificationsController;
