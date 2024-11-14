import { NotificationEntity } from '../entities/notification.entity';

export class GetNotificationsResponse {
	data: NotificationEntity[];
	count: number;

	constructor(data: NotificationEntity[], count: number) {
		this.data = data;
		this.count = count;
	}

	static create(data: NotificationEntity[], count: number): GetNotificationsResponse {
		return new GetNotificationsResponse(data, count);
	}
}
