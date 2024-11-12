import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMessageRequest } from './dtos/create-message-request.dto';
import { CreateMessageResponse } from './dtos/create-message-response.dto';
import { GetSentMessagesRequest } from './dtos/get-sent-messages-request.dto';
import { GetSentMessagesResponse } from './dtos/get-sent-messages-response.dto';
import { CheckActiveUserGuard } from './guards/check-active-user.guard';
import { CheckMessageUsersGuard } from './guards/check-message-users.guard';
import { MessagesService } from './messages.service';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	@UseGuards(CheckMessageUsersGuard, CheckActiveUserGuard)
	@ApiOperation({ summary: 'Send message' })
	@ApiResponse({ status: 201, type: CreateMessageResponse, description: 'Message sent' })
	async send(@Body() request: CreateMessageRequest): Promise<CreateMessageResponse> {
		return this.messagesService.send(request);
	}

	@Get()
	async getSentMessages(
		@Query() request: GetSentMessagesRequest,
	): Promise<GetSentMessagesResponse> {
		return this.messagesService.getSentMessages(request);
	}
}
