import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

export class FindUsersByFilterResponse {
	@ApiProperty()
	readonly data: UserEntity[];

	@ApiProperty()
	readonly count: number;

	constructor(data: UserEntity[], count: number) {
		this.data = data;
		this.count = count;
	}

	static create(data: UserEntity[], count: number): FindUsersByFilterResponse {
		return new FindUsersByFilterResponse(data, count);
	}
}
