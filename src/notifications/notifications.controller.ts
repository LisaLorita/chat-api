import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CheckOwnerGuard } from '../auth/guards/check-owner.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetNotificationsRequest } from './dtos/get-notifications-request.dto';
import { GetNotificationsResponse } from './dtos/get-notifications-response.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Get(':userId')
	@UseGuards(JwtGuard, CheckOwnerGuard, UserExistsGuard)
	@ApiOperation({ summary: 'Get user notifications' })
	@ApiResponse({ type: GetNotificationsResponse, status: 201, description: 'Notification getted' })
	async get(@Param() request: GetNotificationsRequest): Promise<GetNotificationsResponse> {
		return this.notificationsService.getByUserId(request);
	}
}

export default NotificationsController;
