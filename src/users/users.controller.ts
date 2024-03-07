import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Controller, Get, Param, Res, UseFilters, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { UsersService } from '@/users/users.service';
import { ServiceErrorCatcher } from '@/common/error/catch.service';
import { USER_ME_PROJECTION, USER_PROJECTION } from '@/users/utils/users.projection';
import { convertToObjectId } from '@/common/helpers/string.helper';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceErrorCatcher)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('@me')
	async getMe(@Jwt() userId: ObjectId, @Res() res: Response) {
		const user = await this.usersService.retrieveUserInformation(userId, USER_ME_PROJECTION);
		return res.status(200).json(user);
	}

	@Get(':userId')
	async getUserById(@Param('userId') userStrId: string, @Res() res: Response) {
		const userId = convertToObjectId(userStrId);
		const user = await this.usersService.retrieveUserInformation(userId, USER_PROJECTION);
		return res.status(200).json(user);
	}
}
